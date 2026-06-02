

const axios =
  require("axios")

const crypto =
  require("crypto")

const {
  PrismaClient
} = require("@prisma/client")

const prisma =
  new PrismaClient()

// =========================
// INITIATE PAYMENT
// =========================
exports.initiatePayment =
  async (req, res) => {

    try {

      const {
        amount,
        email,
        first_name,
        last_name,
        registryId,
        giftItemId,
        message
      } = req.body

      // =====================
      // VALIDATION
      // =====================
      if (
        !amount ||
        !email ||
        !first_name ||
        !last_name ||
        !registryId
      ) {

        return res
          .status(400)
          .json({
            error:
              "Missing required fields"
          })
      }

      const numericAmount =
        parseFloat(amount)

      if (
        isNaN(numericAmount) ||
        numericAmount <= 0
      ) {

        return res
          .status(400)
          .json({
            error:
              "Invalid amount"
          })
      }

      // =====================
      // TX REF
      // =====================
      const tx_ref =
        `bene_${Date.now()}`

      // =====================
      // SAVE CONTRIBUTION
      // =====================
      await prisma.contribution.create({

        data: {

          amount:
            numericAmount,

          name:
            first_name,

          message:
            message ||
            "🎁 Contribution",

          registryId,

          giftItemId:
            giftItemId || null,

          tx_ref,

          status:
            "pending"
        }
      })

      // =====================
      // CHAPA REQUEST
      // =====================
      const response =
        await axios.post(

          "https://api.chapa.co/v1/transaction/initialize",

          {

            amount:
              numericAmount,

            currency:
              "ETB",

            email:
              String(email)
                .trim()
                .toLowerCase(),

            first_name,

            last_name,

            tx_ref,

            callback_url:
              `${process.env.BACKEND_URL}/api/payment/webhook`,

            return_url:
              `${process.env.FRONTEND_URL}/success?tx_ref=${tx_ref}`
          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
          }
        )

      // =====================
      // RESPONSE
      // =====================
      res.json({

        checkout_url:
          response.data.data.checkout_url,

        tx_ref
      })

    } catch (err) {

      console.log(
        "🔥 PAYMENT ERROR:",
        err.response?.data ||
        err.message
      )

      res.status(500).json({
        error:
          "Failed to initiate payment"
      })
    }
  }

// =========================
// WEBHOOK
// =========================
exports.handleWebhook =
  async (req, res) => {

    try {

      const data =
        req.body

      console.log(
        "📩 Webhook:",
        data
      )

      const chapaSignature =
        req.headers[
          "chapa-signature"
        ]

      // =====================
      // SIGNATURE CHECK
      // =====================
      if (
        process.env.NODE_ENV ===
        "production"
      ) {

        if (!chapaSignature) {

          return res
            .sendStatus(401)
        }

        const computedHash =
          crypto
            .createHmac(
              "sha256",
              process.env.CHAPA_WEBHOOK_SECRET
            )
            .update(
              req.rawBody ||
              JSON.stringify(req.body)
            )
            .digest("hex")

        if (
          computedHash !==
          chapaSignature
        ) {

          return res
            .sendStatus(401)
        }
      }

      // =====================
      // VALIDATION
      // =====================
      if (
        !data.tx_ref ||
        data.status !== "success"
      ) {

        return res
          .sendStatus(400)
      }

      const tx_ref =
        data.tx_ref

      // =====================
      // VERIFY CHAPA
      // =====================
      const verify =
        await axios.get(

          `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,

          {

            headers: {

              Authorization:
                `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
          }
        )

      if (
        verify.data.status !==
        "success"
      ) {

        return res
          .sendStatus(400)
      }

      // =====================
      // FIND CONTRIBUTION
      // =====================
      const contribution =
        await prisma.contribution.findUnique({

          where: {
            tx_ref
          }
        })

      if (!contribution) {

        return res
          .sendStatus(404)
      }

      // =====================
      // ALREADY COMPLETED
      // =====================
      if (
        contribution.status ===
        "completed"
      ) {

        return res
          .sendStatus(200)
      }

      // =====================
      // UPDATE
      // =====================
      await prisma.contribution.update({

        where: {
          tx_ref
        },

        data: {
          status:
            "completed"
        }
      })

      console.log(
        "✅ Payment completed:",
        tx_ref
      )

      res.sendStatus(200)

    } catch (err) {

      console.log(
        "🔥 WEBHOOK ERROR:",
        err.message
      )

      res.sendStatus(500)
    }
  }
const { PrismaClient } =
  require('@prisma/client')

const prisma =
  new PrismaClient()

const axios =
  require('axios')

const { v4: uuidv4 } =
  require('uuid')

// =========================
// 💰 DONATE TO GIFT
// =========================
exports.donateToGift =
  async (req, res) => {

    try {

      const {
        giftItemId
      } = req.params

      const {
        amount,
        message,
        name
      } = req.body

      // =====================
      // FIND GIFT
      // =====================
      const gift =
        await prisma.giftItem.findUnique({

          where: {
            id: giftItemId
          },

          include: {
            registry: true
          }
        })

      if (!gift) {

        return res
          .status(404)
          .json({
            error:
              'Gift not found'
          })
      }

      // =====================
      // TX REF
      // =====================
      const tx_ref =
        `benenew-${uuidv4()}`

      // =====================
      // SAVE CONTRIBUTION
      // =====================
      await prisma.contribution.create({

        data: {

          amount:
            parseFloat(amount),

          message,

          name,

          tx_ref,

          status: 'pending',

          registryId:
            gift.registryId,

          giftItemId
        }
      })

      // =====================
      // CHAPA INITIALIZE
      // =====================
      const chapaResponse =
        await axios.post(

          'https://api.chapa.co/v1/transaction/initialize',

          {

            amount,

            currency: 'ETB',

            email:
              'guest@benenew.com',

            first_name:
              name || 'Guest',

            tx_ref,

            callback_url:
              `${process.env.BACKEND_URL}/api/contribution/verify/${tx_ref}`,

            return_url:
              `${process.env.FRONTEND_URL}/payment-success`
          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
          }
        )

      res.json({

        checkout_url:
          chapaResponse.data.data.checkout_url
      })

    } catch (error) {

      console.log(
        'DONATION ERROR:',
        error.response?.data || error
      )

      res.status(500).json({
        error:
          'Donation failed'
      })
    }
  }

// =========================
// ✅ VERIFY PAYMENT
// =========================
exports.verifyPayment =
  async (req, res) => {

    try {

      const {
        tx_ref
      } = req.params

      // =====================
      // VERIFY CHAPA
      // =====================
      const response =
        await axios.get(

          `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,

          {

            headers: {

              Authorization:
                `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
          }
        )

      const payment =
        response.data.data

      // =====================
      // SUCCESS
      // =====================
      if (
        payment.status ===
        'success'
      ) {

        await prisma.contribution.update({

          where: {
            tx_ref
          },

          data: {
            status: 'paid'
          }
        })
      }

      // redirect to frontend success page
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-success`
      )

    } catch (error) {

      console.log(
        'VERIFY ERROR:',
        error.response?.data || error
      )

      res.status(500).json({
        error:
          'Verification failed'
      })
    }
  }

// =========================
// GET CONTRIBUTIONS
// =========================
exports.getRegistryContributions =
  async (req, res) => {

    try {

      const {
        registryId
      } = req.params

      const contributions =
        await prisma.contribution.findMany({

          where: {

            registryId,

            status: 'paid'
          },

          include: {

            giftItem: true
          },

          orderBy: {
            createdAt: 'desc'
          }
        })

      res.json(contributions)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        error:
          'Failed to fetch contributions'
      })
    }
  }

// =========================
// GET TOTAL
// =========================
exports.getTotalContribution =
  async (req, res) => {

    try {

      const {
        registryId
      } = req.params

      const total =
        await prisma.contribution.aggregate({

          where: {

            registryId,

            status: 'paid'
          },

          _sum: {
            amount: true
          }
        })

      res.json({

        registryId,

        totalAmount:
          total._sum.amount || 0
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        error:
          'Failed to calculate total'
      })
    }
  }
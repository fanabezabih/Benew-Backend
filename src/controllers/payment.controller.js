const axios = require("axios");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// =========================
// INITIATE PAYMENT
// =========================
exports.initiatePayment = async (req, res) => {
  try {
    const {
      amount,
      email,
      first_name,
      last_name,
      registryId,
      giftItemId,
      message
    } = req.body;

    if (!amount || !email || !first_name || !last_name || !registryId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const tx_ref = `bene_${Date.now()}`;

    // =========================
    // CREATE PENDING RECORD
    // =========================
    await prisma.contribution.create({
      data: {
        amount: numericAmount,
        name: first_name,
        message: message || "🎁 Contribution",
        registryId,
        giftItemId: giftItemId || null,
        tx_ref,
        status: "pending"
      }
    });

    // =========================
    // CALL CHAPA
    // =========================
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: numericAmount,
        currency: "ETB",
        email: String(email).trim().toLowerCase(),
        first_name,
        last_name,
        tx_ref,

        // 🔒 Webhook (IMPORTANT)
        callback_url: `${process.env.BACKEND_URL}/api/payment/webhook`,

        // 🟢 Frontend redirect
        return_url: `${process.env.FRONTEND_URL}/success?tx_ref=${tx_ref}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    res.json({
      checkout_url: response.data.data.checkout_url,
      tx_ref
    });

  } catch (err) {
    console.log("🔥 PAYMENT ERROR:", err.message);
    res.status(500).json({ error: "Payment failed" });
  }
};


// =========================
// WEBHOOK (FINAL VERSION)
// =========================
exports.handleWebhook = async (req, res) => {
  try {
    const data = req.body;

    console.log("📩 Webhook received:", data);

    const chapaSignature = req.headers["chapa-signature"];

    // =========================
    // 🔐 SIGNATURE CHECK
    // =========================
    if (process.env.NODE_ENV === "production") {

      if (!chapaSignature) {
        console.log("❌ Missing signature");
        return res.sendStatus(401);
      }

      const computedHash = crypto
        .createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET)
        .update(req.rawBody || JSON.stringify(req.body))
        .digest("hex");

      if (computedHash !== chapaSignature) {
        console.log("❌ Invalid signature");
        return res.sendStatus(401);
      }

      console.log("✅ Signature valid");

    } else {
      console.log("⚠️ Skipping signature check (test mode)");
    }

    // =========================
    // BASIC VALIDATION
    // =========================
    if (!data.tx_ref) return res.sendStatus(400);

    if (data.status !== "success") {
      console.log("❌ Payment not successful");
      return res.sendStatus(400);
    }

    const tx_ref = data.tx_ref;

    // =========================
    // VERIFY WITH CHAPA
    // =========================
    const verify = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    if (verify.data.status !== "success") {
      console.log("❌ Verification failed");
      return res.sendStatus(400);
    }

    // =========================
    // FIND CONTRIBUTION
    // =========================
    const contribution = await prisma.contribution.findUnique({
      where: { tx_ref }
    });

    if (!contribution) {
      console.log("❌ Contribution not found");
      return res.sendStatus(404);
    }

    // =========================
    // PREVENT DOUBLE UPDATE
    // =========================
    if (contribution.status === "completed") {
      console.log("⚠️ Already completed:", tx_ref);
      return res.sendStatus(200);
    }

    // =========================
    // UPDATE STATUS
    // =========================
    await prisma.contribution.update({
      where: { tx_ref },
      data: {
        status: "completed"
      }
    });

    console.log("✅ Payment confirmed:", tx_ref);

    res.sendStatus(200);

  } catch (err) {
    console.log("🔥 WEBHOOK ERROR:", err.message);
    res.sendStatus(500);
  }
};
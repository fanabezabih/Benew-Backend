

const express =
  require("express")

const router =
  express.Router()

const {
  initiatePayment,
  handleWebhook
} = require(
  "../controllers/payment.controller"
)

// =========================
// INITIATE PAYMENT
// =========================
router.post(
  "/initiate",
  initiatePayment
)

// =========================
// CHAPA WEBHOOK
// =========================
router.post(
  "/webhook",
  handleWebhook
)

module.exports =
  router
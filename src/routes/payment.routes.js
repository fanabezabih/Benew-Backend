const express = require("express");
const router = express.Router();

const {
  initiatePayment,
  handleWebhook
} = require("../controllers/payment.controller");

// initiate payment
router.post("/initiate", initiatePayment);

// 🔥 webhook (CHAPA calls this)
router.post("/webhook", handleWebhook);

module.exports = router;
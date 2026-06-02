const express =
  require('express')

const router =
  express.Router()

const {

  donateToGift,

  verifyPayment,

  getRegistryContributions,

  getTotalContribution

} = require(
  '../controllers/contribution.controller'
)

// =========================
// 💰 DONATE TO GIFT
// =========================
router.post(
  '/gift/:giftItemId',
  donateToGift
)

// =========================
// ✅ VERIFY PAYMENT
// =========================
router.get(
  '/verify/:tx_ref',
  verifyPayment
)

// =========================
// GET CONTRIBUTIONS
// =========================
router.get(
  '/:registryId',
  getRegistryContributions
)

// =========================
// GET TOTAL
// =========================
router.get(
  '/total/:registryId',
  getTotalContribution
)

module.exports =
  router
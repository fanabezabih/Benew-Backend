const express = require("express");
const router = express.Router();

const {
  addGift,
  updateGift,
  deleteGift,
  reserveGift
} = require("../controllers/gift.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

// ➕ Add gift to registry
router.post("/:registryId", authMiddleware, addGift);

// ✏️ update gift
router.put("/:id", authMiddleware, updateGift);

// ❌ delete gift
router.delete("/:id", authMiddleware, deleteGift);

// 🔒 reserve gift (public action OR authenticated — your choice)
router.patch("/:id/reserve", reserveGift);

module.exports = router;
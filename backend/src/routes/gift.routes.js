const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "uploads/"
});

const {
  addGift,
  updateGift,
  deleteGift,
  reserveGift
} = require("../controllers/gift.controller");

const {
  authMiddleware
} = require("../middleware/auth.middleware");

// =======================
// ➕ ADD GIFT
// =======================
router.post(
  "/:registryId",
  authMiddleware,
  upload.single("image"),
  addGift
);

// =======================
// ✏️ UPDATE GIFT
// =======================
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateGift
);

// =======================
// ❌ DELETE GIFT
// =======================
router.delete(
  "/:id",
  authMiddleware,
  deleteGift
);

// =======================
// 🔒 RESERVE GIFT
// =======================
router.patch(
  "/:id/reserve",
  reserveGift
);

module.exports = router;
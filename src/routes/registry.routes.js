const express = require("express");
const router = express.Router();

const {
  createRegistry,
  getRegistry,
  getRegistryDashboard,
  searchRegistries,
  getUnifiedShare,
  updateRegistry,
  deleteRegistry
} = require("../controllers/registry.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

// =========================
// PUBLIC ROUTES
// =========================
router.get("/search", searchRegistries);
router.get("/:id", getRegistry);
router.get("/:id/share", getUnifiedShare);

// =========================
// PROTECTED ROUTES
// =========================
router.post("/create", authMiddleware, createRegistry);
router.get("/:id/dashboard", authMiddleware, getRegistryDashboard);

router.put("/:id", authMiddleware, updateRegistry);
router.delete("/:id", authMiddleware, deleteRegistry);

module.exports = router;
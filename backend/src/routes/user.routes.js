const express = require("express");
const router = express.Router();

const { getUserDashboard } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// 🔐 USER DASHBOARD
router.get("/dashboard", authMiddleware, getUserDashboard);

module.exports = router;
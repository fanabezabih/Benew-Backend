const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  me
} = require("../controllers/auth.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// PROTECTED
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

module.exports = router;
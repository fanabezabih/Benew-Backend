const express = require("express");
const router = express.Router();

const { generateRegistryQR } = require("../controllers/qr.controller");

// Public QR (anyone can generate from link)
router.get("/registry/:id", generateRegistryQR);

module.exports = router;
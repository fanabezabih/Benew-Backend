const express = require("express");
const router = express.Router();

const {
  getPreview
} = require("../controllers/linkPreview.controller");

// GET /api/link-preview?url=...
router.get("/", getPreview);

module.exports = router;
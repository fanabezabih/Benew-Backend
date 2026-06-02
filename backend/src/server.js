require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ========================
// RAW BODY (FOR CHAPA WEBHOOK)
// ========================
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.urlencoded({ extended: true }));

// DEBUG REQUESTS
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

app.use(cookieParser());

// ========================
// CORS
// ========================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://benenew.vercel.app",
      "https://benenew-amber.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// ========================
// ROUTES
// ========================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/registry", require("./routes/registry.routes"));
app.use("/api/gifts", require("./routes/gift.routes"));
app.use("/api/contribution", require("./routes/contribution.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/api/qr", require("./routes/qr.routes"));

// LINK PREVIEW ROUTE
app.use("/api/link-preview", require("./routes/linkPreview.routes"));

// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.send("🚀 Bene'new API running...");
});

// ========================
// ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);

  res.status(500).json({
    error: err.message || "Internal server error",
  });
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
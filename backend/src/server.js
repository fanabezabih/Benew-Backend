require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ========================
// CORS CONFIG (FIXED)
// ========================
const allowedOrigins = [
  "http://localhost:3000", // local dev
  process.env.FRONTEND_URL // production (Vercel)
].filter(Boolean); // removes undefined

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "https://benenew.vercel.app"
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ========================
// MIDDLEWARE
// ========================
app.use(express.urlencoded({ extended: true }));

// 🔥 Webhook BEFORE express.json()
app.use(
  "/api/payment/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);

app.use(express.json());

// ========================
// ROUTES
// ========================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/password", require("./routes/password.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/gifts", require("./routes/gift.routes"));
app.use("/api/registry", require("./routes/registry.routes"));
app.use("/api/contribution", require("./routes/contribution.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/api/qr", require("./routes/qr.routes"));

// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.send("Bene’nw API running...");
});

// ========================
// ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
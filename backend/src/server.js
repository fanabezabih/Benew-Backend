require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());

// 🔥 IMPORTANT: Webhook must come BEFORE express.json()
app.use(
  "/api/payment/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // needed for signature verification
    }
  })
);

// normal JSON parsing for all other routes
app.use(express.json());

// ========================
// ROUTES IMPORT
// ========================
const authRoutes = require("./routes/auth.routes");
const passwordRoutes = require("./routes/password.routes");
const userRoutes = require("./routes/user.routes");

const giftRoutes = require("./routes/gift.routes");
const registryRoutes = require("./routes/registry.routes");
const contributionRoutes = require("./routes/contribution.routes");
const paymentRoutes = require("./routes/payment.routes");
const qrRoutes = require("./routes/qr.routes");

// ========================
// ROUTE MOUNTING
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/user", userRoutes);

app.use("/api/gifts", giftRoutes);
app.use("/api/registry", registryRoutes);
app.use("/api/contribution", contributionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/qr", qrRoutes);

// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.send("Bene’nw API running...");
});

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
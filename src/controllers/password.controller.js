const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email");

const prisma = new PrismaClient();

// =========================
// FORGOT PASSWORD
// =========================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry: expiry
      }
    });

    // 🔗 RESET LINK (frontend page)
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 📧 SEND EMAIL
    await sendEmail({
      to: email,
      subject: "Reset your Bene'nw password",
      html: `
        <h2>Reset Password</h2>
        <p>Hello ${user.name},</p>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({
      message: "Password reset link sent to email"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Forgot password failed" });
  }
};

// =========================
// RESET PASSWORD
// =========================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log("🔥 RESET PASSWORD ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
};
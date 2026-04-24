const nodemailer = require("nodemailer");

// =========================
// CREATE TRANSPORTER
// =========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =========================
// SEND EMAIL FUNCTION
// =========================
exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bene'nw" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);
    throw new Error("Email failed to send");
  }
};
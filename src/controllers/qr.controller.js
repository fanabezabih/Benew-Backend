const QRCode = require("qrcode");

exports.generateRegistryQR = async (req, res) => {
  try {
    const { id } = req.params;

    // Frontend link (IMPORTANT)
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const registryUrl = `${baseUrl}/r/${id}`;

    // Generate QR as Data URL (image)
    const qrCode = await QRCode.toDataURL(registryUrl);

    res.json({
      registryUrl,
      qrCode // base64 image
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
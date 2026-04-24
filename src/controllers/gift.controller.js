const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ➕ ADD GIFT
exports.addGift = async (req, res) => {
  try {
    const { registryId } = req.params;
    const { title, description, price, quantity, link } = req.body;

    const gift = await prisma.giftItem.create({
      data: {
        title,
        description,
        price: price ? parseFloat(price) : null,
        quantity: quantity || 1,
        link,
        registryId
      }
    });

    res.json(gift);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add gift" });
  }
};

// ✏️ UPDATE GIFT
exports.updateGift = async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await prisma.giftItem.update({
      where: { id },
      data: req.body
    });

    res.json(gift);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update gift" });
  }
};

// ❌ DELETE GIFT
exports.deleteGift = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.giftItem.delete({
      where: { id }
    });

    res.json({ message: "Gift deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete gift" });
  }
};

// 🔒 RESERVE GIFT (VERY IMPORTANT FOR REGISTRY SYSTEM)
exports.reserveGift = async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await prisma.giftItem.update({
      where: { id },
      data: {
        isReserved: true
      }
    });

    res.json({ message: "Gift reserved", gift });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to reserve gift" });
  }
};
const { PrismaClient } = require("@prisma/client");
const QRCode = require("qrcode");

const prisma = new PrismaClient();

// =========================
// CREATE REGISTRY
// =========================
exports.createRegistry = async (req, res) => {
  try {
    const { title, description, goalAmount, occasion } = req.body;
    const userId = req.user.userId; // ✅ FIXED

    const registry = await prisma.registry.create({
      data: {
        title,
        description,
        goalAmount: goalAmount || 10000,
        occasion,
        userId
      }
    });

    res.json(registry);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create registry" });
  }
};

// =========================
// PUBLIC REGISTRY
// =========================
exports.getRegistry = async (req, res) => {
  try {
    const { id } = req.params;

    const registry = await prisma.registry.findUnique({
      where: { id },
      include: {
        gifts: true,
        contributions: true
      }
    });

    if (!registry) {
      return res.status(404).json({ error: "Registry not found" });
    }

    const completed = registry.contributions.filter(
      (c) => c.status === "completed"
    );

    const totalRaised = completed.reduce((sum, c) => sum + c.amount, 0);

    const goal = registry.goalAmount || 10000;

    const percent = goal > 0
      ? Math.min((totalRaised / goal) * 100, 100)
      : 0;

    const gifts = registry.gifts.map((g) => {
      const giftContributions = completed.filter(
        (c) => c.giftItemId === g.id
      );

      const funded = giftContributions.reduce(
        (sum, c) => sum + c.amount,
        0
      );

      const giftPercent = g.price
        ? Math.min((funded / g.price) * 100, 100)
        : 0;

      return {
        id: g.id,
        title: g.title,
        description: g.description,
        price: g.price,
        quantity: g.quantity,
        funded,
        percent: Number(giftPercent.toFixed(2)),
        isFullyFunded: g.price ? funded >= g.price : false
      };
    });

    const donors = completed.map((c) => ({
      name: c.name || "Anonymous",
      amount: c.amount,
      message: c.message || ""
    }));

    res.json({
      id: registry.id,
      title: registry.title,
      description: registry.description,
      progress: {
        goal,
        totalRaised,
        percent: Number(percent.toFixed(2))
      },
      gifts,
      donors
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch registry" });
  }
};

// =========================
// DASHBOARD (OWNER ONLY)
// =========================
exports.getRegistryDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const registry = await prisma.registry.findUnique({
      where: { id },
      include: {
        gifts: true,
        contributions: true
      }
    });

    if (!registry) {
      return res.status(404).json({ error: "Registry not found" });
    }

    // 🔒 OWNER CHECK
    if (registry.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const completed = registry.contributions.filter(
      (c) => c.status === "completed"
    );

    const totalRaised = completed.reduce((sum, c) => sum + c.amount, 0);

    const goal = registry.goalAmount || 10000;

    const progressPercent =
      goal > 0 ? Math.min((totalRaised / goal) * 100, 100) : 0;

    const messages = completed
      .filter(c => c.message)
      .map(c => ({
        name: c.name,
        message: c.message,
        amount: c.amount,
        date: c.createdAt
      }));

    res.json({
      registry,
      gifts: registry.gifts,
      contributions: registry.contributions,
      stats: {
        totalRaised,
        totalContributions: completed.length
      },
      progress: {
        goal,
        percent: Number(progressPercent.toFixed(2))
      },
      messages
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Dashboard failed" });
  }
};

// =========================
// UPDATE REGISTRY
// =========================
exports.updateRegistry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const registry = await prisma.registry.findUnique({
      where: { id }
    });

    if (!registry) {
      return res.status(404).json({ error: "Registry not found" });
    }

    if (registry.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await prisma.registry.update({
      where: { id },
      data: req.body
    });

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
};

// =========================
// DELETE REGISTRY
// =========================
exports.deleteRegistry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const registry = await prisma.registry.findUnique({
      where: { id }
    });

    if (!registry) {
      return res.status(404).json({ error: "Registry not found" });
    }

    if (registry.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.registry.delete({
      where: { id }
    });

    res.json({ message: "Registry deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
};

// =========================
// SEARCH
// =========================
exports.searchRegistries = async (req, res) => {
  try {
    const { q } = req.query;

    const registries = await prisma.registry.findMany({
      where: q
        ? {
            title: {
              contains: q,
              mode: "insensitive"
            }
          }
        : undefined,
      select: {
        id: true,
        title: true,
        description: true,
        goalAmount: true,
        createdAt: true
      }
    });

    res.json(registries);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Search failed" });
  }
};

// =========================
// SHARE SYSTEM
// =========================
exports.getUnifiedShare = async (req, res) => {
  try {
    const { id } = req.params;

    const registry = await prisma.registry.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true
      }
    });

    if (!registry) {
      return res.status(404).json({ error: "Registry not found" });
    }

    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const shareUrl = `${baseUrl}/r/${registry.id}`;

    const whatsappUrl =
      `https://wa.me/?text=${encodeURIComponent(
        `🎁 ${registry.title}\n${shareUrl}`
      )}`;

    const telegramUrl =
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;

    const email = {
      subject: registry.title,
      body: shareUrl
    };

    const qrCode = await QRCode.toDataURL(shareUrl);

    res.json({
      shareUrl,
      whatsappUrl,
      telegramUrl,
      email,
      qrCode
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Share failed" });
  }
};
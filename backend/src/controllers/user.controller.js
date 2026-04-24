const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        registries: {
          include: {
            contributions: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔢 calculate stats
    let totalRaised = 0;
    let totalRegistries = user.registries.length;

    user.registries.forEach((r) => {
      r.contributions.forEach((c) => {
        if (c.status === "completed") {
          totalRaised += c.amount;
        }
      });
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      stats: {
        totalRegistries,
        totalRaised
      },
      registries: user.registries
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Dashboard failed" });
  }
};
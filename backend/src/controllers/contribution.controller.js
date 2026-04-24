const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// =========================
// ADD CONTRIBUTION
// =========================
exports.addContribution = async (req, res) => {
  try {
    const {
      amount,
      message,
      name,
      registryId,
      giftItemId
    } = req.body;

    // ✅ 1. CHECK registry exists
    const registry = await prisma.registry.findUnique({
      where: { id: registryId }
    });

    if (!registry) {
      return res.status(404).json({
        error: "Registry not found. Use a valid registryId."
      });
    }

    // ✅ 2. (optional but strong) check giftItem if provided
    if (giftItemId) {
      const gift = await prisma.giftItem.findUnique({
        where: { id: giftItemId }
      });

      if (!gift) {
        return res.status(404).json({
          error: "Gift item not found"
        });
      }
    }

    // ✅ 3. CREATE contribution
    const contribution = await prisma.contribution.create({
      data: {
        amount: parseFloat(amount),
        message,
        name,
        registryId,
        giftItemId: giftItemId || null
      }
    });

    res.json(contribution);

  } catch (error) {
    console.log("🔥 CONTRIBUTION ERROR:", error);

    res.status(500).json({
      error: error.message,
      fullError: error
    });
  }
};

// =========================
// GET CONTRIBUTIONS BY REGISTRY
// =========================
exports.getRegistryContributions = async (req, res) => {
  try {
    const { registryId } = req.params;

    const contributions = await prisma.contribution.findMany({
      where: { registryId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
};


// =========================
// GET TOTAL CONTRIBUTION (IMPORTANT)
// =========================
exports.getTotalContribution = async (req, res) => {
  try {
    const { registryId } = req.params;

    const total = await prisma.contribution.aggregate({
      where: { registryId },
      _sum: {
        amount: true
      }
    });

    res.json({
      registryId,
      totalAmount: total._sum.amount || 0
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate total' });
  }
};
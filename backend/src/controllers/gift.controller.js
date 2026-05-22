const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("../config/cloudinary");

// =======================
// ➕ ADD GIFT
// =======================
// =======================
// ➕ ADD GIFT
// =======================
exports.addGift = async (req, res) => {

  try {

    const { registryId } =
      req.params;

    const userId =
      req.user.userId;

    const {
      title,
      description,
      price,
      quantity,
      link
    } = req.body;

    let imageUrl = null;

    // =========================
    // IMAGE UPLOAD
    // =========================
    if (req.file) {

      const upload =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder:
              "benenew/gifts"
          }
        );

      imageUrl =
        upload.secure_url;
    }

    // =========================
    // CREATE GIFT
    // =========================
    const gift =
      await prisma.giftItem.create({

        data: {

          title,

          description,

          price:
            price
              ? parseFloat(price)
              : null,

          quantity:
            quantity
              ? Number(quantity)
              : 1,

          link,

          image: imageUrl,

          registryId,

          // ✅ IMPORTANT
          addedById: userId
        }
      });

    res.json(gift);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error:
        "Failed to add gift"
    });
  }
};

// =======================
// ✏️ UPDATE GIFT
// =======================
// =======================
// ✏️ UPDATE GIFT
// =======================
exports.updateGift = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const userId =
      req.user.userId;

    // =========================
    // FIND GIFT
    // =========================
    const existingGift =
      await prisma.giftItem.findUnique({
        where: { id }
      });

    if (!existingGift) {

      return res
        .status(404)
        .json({
          error:
            "Gift not found"
        });
    }

    // =========================
    // OWNER CHECK
    // =========================
    if (
      existingGift.addedById !==
      userId
    ) {

      return res
        .status(403)
        .json({
          error:
            "Unauthorized"
        });
    }

    let imageUrl;

    // =========================
    // IMAGE
    // =========================
    if (req.file) {

      const upload =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder:
              "benenew/gifts"
          }
        );

      imageUrl =
        upload.secure_url;
    }

    const {
      title,
      description,
      price,
      quantity,
      link
    } = req.body;

    // =========================
    // UPDATE
    // =========================
    const updatedGift =
      await prisma.giftItem.update({

        where: { id },

        data: {

          title,

          description,

          price:
            price
              ? parseFloat(price)
              : null,

          quantity:
            quantity
              ? Number(quantity)
              : 1,

          link,

          ...(imageUrl && {
            image: imageUrl
          })
        }
      });

    res.json(updatedGift);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error:
        "Failed to update gift"
    });
  }
};

// =======================
// ❌ DELETE GIFT
// =======================
// =======================
// ❌ DELETE GIFT
// =======================
exports.deleteGift = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const userId =
      req.user.userId;

    // =========================
    // FIND GIFT
    // =========================
    const existingGift =
      await prisma.giftItem.findUnique({
        where: { id }
      });

    if (!existingGift) {

      return res
        .status(404)
        .json({
          error:
            "Gift not found"
        });
    }

    // =========================
    // OWNER CHECK
    // =========================
    if (
      existingGift.addedById !==
      userId
    ) {

      return res
        .status(403)
        .json({
          error:
            "Unauthorized"
        });
    }

    // =========================
    // DELETE
    // =========================
    await prisma.giftItem.delete({
      where: { id }
    });

    res.json({
      message:
        "Gift deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error:
        "Failed to delete gift"
    });
  }
};
// =======================
// 🔒 RESERVE GIFT
// =======================
exports.reserveGift = async (req, res) => {
  try {
    const { id } = req.params;

    const gift =
      await prisma.giftItem.update({
        where: {
          id
        },

        data: {
          isReserved: true
        }
      });

    res.json({
      message: "Gift reserved",
      gift
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to reserve gift"
    });
  }
};
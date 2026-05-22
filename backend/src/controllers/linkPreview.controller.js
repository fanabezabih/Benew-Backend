const axios = require("axios");
const cheerio = require("cheerio");

exports.getPreview = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "URL required",
      });
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0",
      },
    });

    const html = response.data;

    const $ = cheerio.load(html);

    // =========================
    // NORMAL OG TAGS
    // =========================
    let title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      "";

    let description =
      $('meta[property="og:description"]').attr(
        "content"
      ) || "";

    let image =
      $('meta[property="og:image"]').attr(
        "content"
      ) || "";

    // =========================
    // TIKTOK FALLBACK
    // =========================
    if (!image && url.includes("tiktok.com")) {

      image =
        $('meta[name="twitter:image"]').attr(
          "content"
        ) || "";

      title =
        title ||
        $('meta[property="twitter:title"]').attr(
          "content"
        );

      description =
        description ||
        $('meta[property="twitter:description"]').attr(
          "content"
        );
    }

    // =========================
    // YOUTUBE FALLBACK
    // =========================
    if (!image && url.includes("youtube.com")) {

      const match =
        url.match(/v=([^&]+)/);

      if (match) {
        image =
          `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
    }

    // =========================
    // FINAL FALLBACK IMAGE
    // =========================
    if (!image) {
      image =
        "https://placehold.co/600x400?text=Bene%27new";
    }

    res.json({
      title,
      description,
      image,
      site: new URL(url).hostname,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to fetch preview",
    });
  }
};
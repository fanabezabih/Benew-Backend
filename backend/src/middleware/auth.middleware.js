const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    let token;

    // COOKIE FIRST
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // HEADER FALLBACK
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
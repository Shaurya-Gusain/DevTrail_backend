const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // 🔹 Format: Bearer token
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = parts[1];

    // 🔥 SAME SECRET (must match login)
    const decoded = jwt.verify(token, "secretkey");

    console.log("DECODED:", decoded);

    // 🔥 Works for both user & agent
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

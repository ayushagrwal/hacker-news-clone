const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log("Auth Middleware");

  const token = req.header("Authorization");
  // console.log("Received Token:", token);

  if (!token) {
    // console.log("No Token Found - Unauthorized");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    // console.log("Token Verification Failed:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

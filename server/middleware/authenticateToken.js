const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization; // Check cookies or headers

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // If the token is sent in the authorization header, it might be preceded by "Bearer "
  const tokenString = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(tokenString, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.userId = decoded.id; // Attach user ID to request object for further middleware/routes
    next(); // Move to the next middleware/route
  });
};

module.exports = authenticateToken;

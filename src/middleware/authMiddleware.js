const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("./config/jwtConfig.js");

const userAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      console.log("Verified user:", decodedToken);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const authorizationMiddleware = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      if (allowedRoles.includes(decodedToken.role)) {
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const adminAuthorization = authorizationMiddleware(["admin"]);
const approverAuthorization = authorizationMiddleware(["admin", "approver"]);

module.exports = {
  userAuthentication,
  adminAuthorization,
  approverAuthorization,
};

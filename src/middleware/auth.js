const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(400).json({ message: "Missing auth token" });
  }

  const [_, token] = header.split(" ");

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = users.find((u) => u.username === verifiedToken.username);
    delete foundUser.password;

    req.user = foundUser;

    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
};

const verifyAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
};

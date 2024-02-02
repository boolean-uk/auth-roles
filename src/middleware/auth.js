const jwt = require("jsonwebtoken");
const { findUserDB } = require("../domains/user.js");
const { getAuthorByPostId } = require("../domains/post.js");

const verifyToken = async (req, res, next) => {
  //   const header = req.header("Authorization");
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(400).json({ message: "Missing auth token" });
  }

  //   const [_, token] = header.split(" ");
  const token = tokenHeader.split(" ")[1];

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await findUserDB(verifiedToken.sub);
    delete foundUser.passwordHash;

    req.user = foundUser;

    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

const verifyAdminRole = async (req, res, next) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
};

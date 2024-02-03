const jwt = require("jsonwebtoken");
const { findUserByUsernameDb } = require("../domains/user");
const secret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    return res.status(400).send({ error: "Missing auth token" });
  }

  const [_, token] = header.split(" ");

  try {
    const verifiedToken = jwt.verify(token, secret);
  } catch (e) {
    return res.status(400).send({ error: "Invalid credentials" });
  }

  const foundUser = await findUserByUsernameDb(verifiedToken.username);

  delete foundUser.passwordHash;

  req.user = foundUser;

  next();
};

module.exports = {
  verifyToken,
};

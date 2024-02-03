const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const errors = require("../errors/errors");
const { findUserByIdDb } = require("../domains/user");
const { findPostByIdDb } = require("../domains/post");

const verifyToken = async (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    return res.status(400).send({ error: "Missing auth token" });
  }

  const [_, token] = header.split(" ");

  try {
    const verifiedToken = jwt.verify(token, secret);

    const foundUser = await findUserByIdDb(verifiedToken.sub);

    if (!foundUser) {
      return res
        .status(404)
        .send({ error: "No user found with username or password" });
    }

    delete foundUser.passwordHash;

    req.user = foundUser;

    next();
  } catch (e) {
    return res.status(400).send({ error: "Invalid credentials" });
  }
};

const verifyAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: errors.unauthorized });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).send({ error: errors.forbidden });
  }

  next();
};

const verifyUserPermissons = async (req, res, next) => {
  const userId = Number(req.params.id);

  if (req.user.role !== "ADMIN" && req.user.id !== userId) {
    return res.status(403).send({ error: errors.forbidden });
  }

  next();
};

const verifyPostPermissons = async (req, res, next) => {
  const postId = Number(req.params.id);

  const postToDelete = await findPostByIdDb(postId);

  if (!postToDelete) {
    return res.status(404).send({ error: "No post found with provided ID" });
  }

  if (req.user.role !== "ADMIN" && req.user.id !== postToDelete.userId) {
    return res.status(403).send({ error: errors.forbidden });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
  verifyUserPermissons,
  verifyPostPermissons,
};

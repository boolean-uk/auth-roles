const jwt = require("jsonwebtoken");
const { selectAdminByIdDb } = require("../domains/user");
const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  try {
    if (tokenType !== "Bearer") {
      throw new Error();
    }
    const { sub: id } = jwt.verify(token, secret);
    req.id = id;
    next();
  } catch (e) {
    res.status(401).json({ error: "unauthorized" });
  }
};

const adminAuthorize = async (req, res, next) => {
  const { id } = req;

  if (!id) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    await selectAdminByIdDb(id)
    next()
  } catch (e) {
    return res.status(403).json({error: "unauthenticated"})
  }
};

module.exports = {
  adminAuthorize,
  authenticate
};

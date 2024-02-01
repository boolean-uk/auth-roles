const jwt = require("jsonwebtoken");
const {
  selectAdminByIdDb,
  selectUserPermission,
  selectUserByPostId,
} = require("../domains/user");
const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  try {
    if (tokenType !== "Bearer") {
      throw new Error();
    }
    const { sub } = jwt.verify(token, secret);
    req.requesterId = sub;
    next();
  } catch (e) {
    res.status(401).json({ error: "unauthorized" });
  }
};

const adminAuthorize = async (req, res, next) => {
  const { requesterId } = req;

  if (!requesterId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    await selectAdminByIdDb(requesterId);
    next();
  } catch (e) {
    return res.status(403).json({ error: "unauthenticated" });
  }
};

const checkUserPermission = (operation, resource) => {
  return async (req, res, next) => {
    const { requesterId } = req;
    const targetUserId = await userIdLookup(resource, req.params.id);
    const target = requesterId === targetUserId ? "OWN" : "ANY";

    if (!requesterId) {
      return res.status(401).json({ error: "unauthorized" });
    }
    try {
      await selectUserPermission(requesterId, operation, resource, target);
      next();
    } catch (e) {
      return res.status(403).json({ error: "unauthenticated" });
    }
  };
};

const userIdLookup = async (resource, id) => {
  const resources = {
    USER: (id) => id,
    POST: async (id) => {
      const user = await selectUserByPostId(id);
      return user.id;
    },
  };
  return await resources[resource](Number(id));
};

module.exports = {
  adminAuthorize,
  authenticate,
  checkUserPermission,
};

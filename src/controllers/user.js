const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createUserDb, getUserDb } = require("../domains/user.js");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdUser = await createUserDb(username, password, role);

    return res.status(201).json({ user: createdUser });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A user with the provided username already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await getUserDb();
    return res.status(200).json({ users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createUser,
  getUser,
};
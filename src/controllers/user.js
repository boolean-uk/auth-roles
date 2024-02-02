const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createUserDb,
  getUsersDB,
  deleteUserDB,
} = require("../domains/user.js");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdUser = await createUserDb(username, password);

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

const getUsers = async (req, res) => {
  const users = await getUsersDB();

  res.status(200).json({ users });
};

const deleteUser = async (req, res) => {
  const id = +req.params.id;

  if (req.user.role !== "ADMIN" && req.user.id !== id) {
    return res.status(403).json({ error: "Forbiddin" });
  }

  const deletedUser = await deleteUserDB(id);

  return res.status(200).json({ user: deletedUser });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};

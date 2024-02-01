const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createUserDb,
  selectAllUsersDb,
  deleteUserDb,
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

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletedCount, deletedUser] = await deleteUserDb(Number(id));
    return res.status(200).json({ user: deletedUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const getAllUsers = async (req, res) => {
  const users = await selectAllUsersDb();

  return res.status(200).json({ users });
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
};

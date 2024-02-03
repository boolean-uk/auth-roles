const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createUserDb,
  getAllUsersDb,
  deleteUserByIdDb,
} = require("../domains/user.js");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdUser = await createUserDb(username, password, role);

    return res.status(201).send({ user: createdUser });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .send({ error: "A user with the provided username already exists" });
      }
    }

    res.status(500).send({ error: e.message });
  }
};

const deleteUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const deletedUser = await deleteUserByIdDb(id);

    return res.status(200).send({ user: deletedUser });
  } catch (e) {
    return res.status(e.status ?? 500).send({ error: e.message });
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await getAllUsersDb();

  return res.status(200).send({ users: allUsers });
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUserById,
};

const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");

const createUserDb = async (username, password, role) =>
  await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6),
      role,
    },
  });

const getAllUsersDb = async () => await prisma.user.findMany();

const findUserByUsernameDb = async (username) =>
  await prisma.user.findUnique({
    where: { username },
  });

module.exports = {
  createUserDb,
  findUserByUsernameDb,
  getAllUsersDb,
};

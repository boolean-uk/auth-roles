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

const deleteUserByIdDb = async (id) =>
  await prisma.user.delete({
    where: { id },
  });

const findUserByIdDb = async (id) =>
  await prisma.user.findUnique({
    where: { id },
  });

module.exports = {
  createUserDb,
  getAllUsersDb,
  deleteUserByIdDb,
  findUserByIdDb,
};

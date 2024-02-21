const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

const getUsersDB = async () => await prisma.user.findMany();

const findUserDB = async (sub) => {
  return await prisma.user.findUnique({ where: { id: Number(sub) } });
};

const deleteUserDB = async (id) => {
  return await prisma.user.delete({ where: { id: Number(id) } });
};

module.exports = {
  createUserDb,
  findUserDB,
  getUsersDB,
  deleteUserDB
}

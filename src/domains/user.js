const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const getAllUsersDb = async () => {
  const users = await prisma.user.findMany()

  return users
}

const getUserBySubDb = async (sub) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      id: Number(sub)
    }
  })

  return foundUser
}

const createUserDb = async (username, password) =>
  await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6)
    }
  })


  const deleteUserDb = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) {
      throw new Error('User not found');
    }
    await prisma.user.delete({ where: { id: Number(userId) } });
    return user;
  };

module.exports = {
  getAllUsersDb,
  getUserBySubDb,
  createUserDb,
  deleteUserDb
}
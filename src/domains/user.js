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

module.exports = {
  getAllUsersDb,
  getUserBySubDb,
  createUserDb
}

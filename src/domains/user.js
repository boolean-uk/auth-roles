const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password, role = 'USER') => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6),
    role
  }
})

const getUsersDb = async () => await prisma.user.findMany({})

const findUserDb = async (id) => await prisma.user.findUnique({
  where: {
    id
  }
})

module.exports = {
  createUserDb,
  getUsersDb,
  findUserDb
}

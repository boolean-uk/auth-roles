import prisma from '../utils/prisma.js'
import bcrypt from 'bcrypt'

const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

export {
  createUserDb
}

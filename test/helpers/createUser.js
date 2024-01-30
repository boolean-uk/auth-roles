import prisma from "../../src/utils/prisma.js"
import bcrypt from 'bcrypt'

const createUser = async (username, password, role = 'USER') => {
  return await prisma.user.create({
    data: {
      username,
      role,
      passwordHash: await bcrypt.hash(password, 6)
    },
  })
}

export {
    createUser
}

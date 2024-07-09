const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => {
    return await prisma.user.create({
        data: {
            username,
            passwordHash: await bcrypt.hash(password, 6),
        },
    })
}

const getUserDb = async (id) =>
  await prisma.user.findUniqueOrThrow({
      where: {
          id: id,
      },
  })

const getAllUsersDb = async () => {
  return await prisma.user.findMany()
}

const deleteUserDb = async (id) => {
  await prisma.post.deleteMany({
    where:{
      userId:id
    }
  })
  
  return await prisma.user.delete({
    where:{
      id:id
    }
  })
}

module.exports = {
    createUserDb,
    getUserDb,
    getAllUsersDb,
    deleteUserDb
}

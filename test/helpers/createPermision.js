const prisma = require('../../src/utils/prisma')

const createPermission = async (permissions, userId) => {
  await permissions.forEach(async (permission) => {
    await prisma.permission.create({
      data: {
        role: 'USER',
        permission,
        user: {
          connect: {
            id: Number(userId)
          }
        }
      }
    })
  })
}

module.exports = { createPermission }

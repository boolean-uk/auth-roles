const prisma = require('../../src/utils/prisma')

const createPermission = async (permissions, userId, role = 'USER') => {
  const data = permissions.map((permission) => ({
    role,
    permission,
    userId: Number(userId)
  }))

  await prisma.permission.createMany({
    data: [...data]
  })
}

module.exports = { createPermission }

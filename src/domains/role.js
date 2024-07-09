const prisma = require("../utils/prisma");

const createRoleDb = async (name) => 
    await prisma.role.create({
        data: {
            name
        }
    })

module.exports = { createRoleDb }
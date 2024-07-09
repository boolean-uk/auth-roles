const prisma = require('../utils/prisma')

const createPostDb = async (title, userId) =>
    await prisma.post.create({
        data: {
            title,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    })

const getPostDb = async (id) =>
    await prisma.post.findUniqueOrThrow({
        where: {
            id: id,
        },
    })

const deletePostDb = async (id) => {
  
  return await prisma.post.delete({
        where: {
            id: id,
        },
    })
}

module.exports = {
    createPostDb,
    getPostDb,
    deletePostDb,
}

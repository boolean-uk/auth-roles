const prisma = require('../utils/prisma')

const createPostDb = async (title, userId) => await prisma.post.create({
  data: {
    title,
    user: {
      connect: {
        id: userId
      }
    }
  }
})

async function deletePostDb(postId) {
  return await prisma.post.delete({
    where: {
      id: postId
    }
  })
}

module.exports = {
  createPostDb,
  deletePostDb
}

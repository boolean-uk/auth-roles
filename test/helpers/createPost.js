import prisma from "../../src/utils/prisma.js"

const createPost = (title, userId) => {
  return prisma.post.create({
    data: {
      title,
      user: {
        connect: {
            id: userId
        }
      }
    },
  })
}

export {
    createPost
}

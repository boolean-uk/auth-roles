import prisma from '../utils/prisma.js'

const createPostDb = (title, userId) => prisma.post.create({
  data: {
    title,
    user: {
      connect: {
        id: userId
      }
    }
  }
})

export {
  createPostDb
}

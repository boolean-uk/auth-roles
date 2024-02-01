const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createPostDb } = require('../domains/post.js')

const createPost = async (req, res) => {
  const {
    title,
    userId
  } = req.body

  if (!title || !userId) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  const createdPost = await createPostDb(title, userId)

  return res.status(201).json({ post: createdPost })
}

module.exports = {
  createPost
}

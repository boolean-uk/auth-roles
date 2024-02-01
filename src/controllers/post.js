const { createPostDb } = require('../domains/post.js')

const createPost = async (req, res) => {
  const {
    title,
    userId
  } = req.body

  if (!title || !userId) {
    throw new Error ("missing input")
  }
    const createdPost = await createPostDb(title, userId)
    return res.status(201).json({ post: createdPost })
}

module.exports = {
  createPost
}

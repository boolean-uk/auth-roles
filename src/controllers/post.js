// DB
const { createPostDb, deletePostDb } = require('../domains/post.js')

const createPost = async (req, res) => {
  const { title } = req.body
  const { user } = req

  const createdPost = await createPostDb(title, user.id)

  return res.status(201).json({ post: createdPost })
}

const deletePost = async (req, res) => {
  const { post } = req

  const deletedPost = await deletePostDb(post.id)

  res.status(200).json({ post: deletedPost })
}

module.exports = {
  createPost,
  deletePost
}

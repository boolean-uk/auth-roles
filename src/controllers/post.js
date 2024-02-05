const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createPostDb } = require('../domains/post.js')
const prisma = require('../utils/prisma.js')

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

  try {
    const createdPost = await createPostDb(title, userId)

    return res.status(201).json({ post: createdPost })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(409).json({ error: "A user with the provided ID does not exist" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const deletePost = async (req, res) => {
  const deletePostId = Number(req.params.id);

  try {
    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: {
        id: deletePostId,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    const deletedPost = await prisma.post.delete({
      where: {
        id: deletePostId,
      },
    });

    console.log("This is the post to be deleted:", deletedPost);

    res.status(200).json({ deletedPost });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};



module.exports = {
  createPost,
  deletePost
}

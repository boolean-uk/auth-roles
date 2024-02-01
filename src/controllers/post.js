const { PrismaClientKnownRequestError } = require("@prisma/client");
const prisma = require('../utils/prisma'); 
const { createPostDb } = require("../domains/post.js");
const { verifyUser } = require('../utils/help.js')

const createPost = async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdPost = await createPostDb(title, userId);

    return res.status(201).json({ post: createdPost });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(409)
          .json({ error: "A user with the provided ID does not exist" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No authentication token provided" });
  }

  try {
    const user = await verifyUser(authHeader);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId !== user.id && user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this post" });
    }

    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  // export other functions if they exist
  createPost,
  deletePost,
};

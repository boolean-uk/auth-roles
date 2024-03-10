const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createPostDb, deletePostByIdDb } = require("../domains/post.js");
const errors = require("../errors/errors.js");

const createPost = async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({
      error: errors.missingFields,
    });
  }

  try {
    const Post = await createPostDb(title, userId);

    return res.status(201).json({ post: Post });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(409)
          .json({ error: "A user with the provided ID does't exist" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const deletePostById = async (req, res) => {
  const postId = Number(req.params.id);

  try {
    const Post = await deletePostByIdDb(postId);

    return res.status(200).send({ post: Post });
  } catch (e) {
    return res.status(e.status ?? 500).send({ error: e.message });
  }
};

module.exports = {
  createPost,
  deletePostById,
};

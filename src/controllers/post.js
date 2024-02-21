const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createPostDb,
  deletePostDB,
  getAuthorByPostId,
} = require("../domains/post.js");

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
  const id = +req.params.id;
  const author = await getAuthorByPostId(req.params.id);

  let isForbidden = true; // default it to not allowed
  let admin = false;

  if (req.user.role === "ADMIN") {
    isForbidden = false;
    admin = true;
  }
  if (req.user.id === author.id) {
    isForbidden = false;
  }

  if (isForbidden) {
    return res.status(403).json({ error: "forbidden" });
  }
  const deletedPost = await deletePostDB(id);

  return res.status(200).json({ post: deletedPost });
};

module.exports = {
  createPost,
  deletePost
}


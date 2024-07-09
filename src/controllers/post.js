const { createPostDb, deletePostDb } = require("../domains/post.js");
const prisma = require("../utils/prisma");

const createPost = async (req, res) => {
    const { title, userId } = req.body;
    const currentUserId = req.user.id;

    if (!title || !userId) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }

    if (currentUserId === userId || req.user.role === "ADMIN") {
        const createdPost = await createPostDb(title, userId);

        return res.status(201).json({ post: createdPost });
    }

    return res
        .status(409)
        .json({ error: "You cannot create a post for someone else" });
};

const deletePost = async (req, res) => {
    const postId = Number(req.params.id);
    const userId = Number(req.user.id)

    const foundPost = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    const authorId = Number(foundPost.userId)

    if (authorId === userId || req.user.role === "ADMIN"){
        const deletedPost = await deletePostDb(postId);
        return res.status(200).json({ post: deletedPost });
    }

    return res.status(403).json({ error: "Forbidden" })
};

module.exports = {
    createPost,
    deletePost,
};

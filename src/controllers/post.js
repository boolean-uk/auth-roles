const { createPostDb, deletePostDb } = require("../domains/post.js");

const createPost = async (req, res) => {
    const {title}  = req.body;
    const userId = req.user.id


    if (!title || !userId) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }
        const createdPost = await createPostDb(title, userId);

        return res.status(201).json({ post: createdPost });
};

const deletePost = async (req, res) => {
    const postId  = Number(req.params.id)
    
    const deletedPost = await deletePostDb(postId)
    return res.status(200).json({ post: deletedPost })
}


module.exports = {
    createPost,
    deletePost
};

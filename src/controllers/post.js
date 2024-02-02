const { createPostDb, deletePostDb } = require("../domains/post.js");


const createPost = async (req, res) => {
    const { title, userId }  = req.body;
    const currentUserId = req.user.id
    // console.log("TITLE----->>>", title)
    // console.log("USERID------>>>", userId)

    if(currentUserId !== userId){
        return res.status(409).json({error: "You cannot create a post for someone else"})
    }

    if (!title) {
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

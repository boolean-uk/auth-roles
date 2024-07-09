const { PrismaClientKnownRequestError } = require('@prisma/client')
const { createPostDb, getPostDb, deletePostDb } = require('../domains/post.js')

const createPost = async (req, res) => {
    const { title, userId } = req.body

    if (!title || !userId) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdPost = await createPostDb(title, userId)

        return res.status(201).json({ post: createdPost })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.status(409).json({
                    error: 'A user with the provided ID does not exist',
                })
            }
        }

        res.status(500).json({ error: e.message })
    }
}

const deletePost = async (req, res) => {
    const parsedId = Number(req.params.id)
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: 'Post ID is invalid' })
    }
    const post = await getPostDb(parsedId)
    const isSelfDelete = post.userId === req.userInformation.id
    const isAdmin = req.isAdmin

    if (isSelfDelete || isAdmin) {
        const deletedPost = await deletePostDb(parsedId)
        return res.json({ post: deletedPost })
    }
    return res.status(403).json({ error: 'Cannot delete post, no permission' })
}

module.exports = {
    createPost,
    deletePost,
}

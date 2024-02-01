const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const { findUserDb } = require('../domains/user')
const { findPostDb } = require('../domains/post')
const messages = require('../errorMessages.js')

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.slice(7)

    if (!token) {
        return res.status(400).json({
            error: messages.missingToken
        })
    }

    const verifiedToken = jwt.verify(token, secret)
    req.token = verifiedToken
    next()
}

const verifyAdmin = async (req, res, next) => {
    const userID = req.token.sub
    const foundUser = await findUserDb(userID)

    if (!foundUser) {
        return res.status(401).json({ message: messages.unauthorisedUser })
    }

    if (foundUser.role !== 'ADMIN') {
        return res.status(403).json({
            error: messages.insufficientPermissons
        })
    }

    next()
}

const verifyDeletePermissions = async (req, res, next) => {
    const userToDeleteID = Number(req.params.userId)
    const currentUserId = req.token.sub
    const currentUser = await findUserDb(currentUserId)

    if (!currentUser) {
        return res.status(401).json({ message: messages.unauthorisedUser })
    }

    if (currentUser.role !== 'ADMIN' && currentUser.id !== userToDeleteID) {
        return res.status(403).json({
            error: messages.insufficientPermissons
        })
    }

    next()
}

const verifyPostDeletePermissions = async (req, res, next) => {
    const postId = Number(req.params.postId)
    const postToDelete = await findPostDb(postId)

    const currentUserId = req.token.sub
    const currentUser = await findUserDb(currentUserId)

    if (!currentUser) {
        return res.status(401).json({ message: messages.unauthorisedUser })
    }

    if (!postToDelete) {
        return res.status(400).json({ message: messages.noPost })
    }

    if (currentUser.role !== 'ADMIN' && currentUser.id !== postToDelete.userId) {
        return res.status(403).json({
            error: messages.insufficientPermissons
        })
    }

    next()
}

module.exports = { verifyToken, verifyAdmin, verifyDeletePermissions, verifyPostDeletePermissions }
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const { findUserDb } = require('../domains/user')

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.slice(7)

    if (!token) {
        return res.status(400).json({
            error: 'Missing authorisation token'
        })
    }

    try {
        const verifiedToken = jwt.verify(token, secret)
        req.token = verifiedToken
        const userID = verifiedToken.sub
        const foundUser = await findUserDb(userID)
        delete foundUser.passwordHash
        req.user = foundUser

        next()
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired token" })
    }
}

const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorised' })
    }

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({
            error: "You do not have permission to view all users."
        })
    }

    next()
}

module.exports = { verifyToken, verifyAdmin }
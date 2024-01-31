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
        next()
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired token" })
    }
}

const verifyAdmin = async (req, res, next) => {
    const userID = req.token.sub
    const foundUser = await findUserDb(userID)

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorised user' })
    }

    if (foundUser.role !== 'ADMIN') {
        return res.status(403).json({
            error: "You do not have sufficient permission."
        })
    }

    delete foundUser.passwordHash
    next()
}

module.exports = { verifyToken, verifyAdmin }
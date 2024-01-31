const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(400).json({
            error: 'Missing authorisation token'
        })
    }
    const splitToken = token.slice(7)

    try {
        jwt.verify(splitToken, secret)
        next()
    } catch (err) {
        return res.status(400).json({ error: "Invalid credentials" })
    }
}

module.exports = { verifyToken }
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
        const verifiedToken = jwt.verify(splitToken, secret)
        req.token = verifiedToken
        next()
    } catch (err) {
        return res.status(400).json({ error: "Invalid credentials" })
    }
}

const verifyAdmin = async (req, res, next) => {
    const userID = req.token.sub

    const findUser = await findUserDb()
}

module.exports = { verifyToken, verifyAdmin }
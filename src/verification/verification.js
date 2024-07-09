const jwt = require('jsonwebtoken')
const { getUserDb } = require('../domains/user')

const hasValidToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
    }
    const tokenData = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET
    )
    if (tokenData) {
        req.tokenData = tokenData
        next()
        return
    }

    return res
        .status(403)
        .json({ error: 'Cannot access resource, invalid token' })
}

const checkRole = async (req, res, next) => {
    const userData = await getUserDb(req.tokenData.sub)

    delete userData.passwordHash

    req.isAdmin = userData.role === 'ADMIN' ? true : false
    req.userInformation = userData

    next()
    return
}

module.exports = { hasValidToken, checkRole }

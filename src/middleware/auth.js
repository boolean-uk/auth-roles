const jwt = require("jsonwebtoken")
const { getUserByIdDb } = require("../domains/user")

const verifyAdminRole = async (req, res, next) => {
    const header = req.headers.authorization
    if (!header) {
        throw new Error("unauthorised")
    }
    const token = header.slice(7, header.length)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await getUserByIdDb(decodedToken.sub)
    if (!foundUser || foundUser.role !== "ADMIN") {
        throw new Error("forbidden")
    }
    next()
}

module.exports = { verifyAdminRole }
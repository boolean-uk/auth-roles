const jwt = require("jsonwebtoken")
const { getUserByIdDb } = require("../domains/user")
const { getPostByDb } = require("../domains/post")

const decodeToken = (header) => {
    if (!header) {
        throw new Error("unauthorised")
    }
    const token = header.slice(7, header.length)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken
}

const verifyAdminRole = async (req, res, next) => {
    const header = req.headers.authorization
    const decodedToken = decodeToken(header)
    const foundUser = await getUserByIdDb(decodedToken.sub)
    if (!foundUser || foundUser.role !== "ADMIN") {
        if(req.params.id) {
            return next()    
        }
        throw new Error("forbidden")
    }
    req.headers.verifiedAdmin = true
    next()
}

const verifyOwner = async (req, res, next) => {
    const verifiedAdmin = req.headers.verifiedAdmin
    if (verifiedAdmin) {
        return next()
    } 
    const header = req.headers.authorization
    const decodedToken = decodeToken(header)

    if (decodedToken.sub !==  Number(req.params.id)) {
        throw new Error("forbidden")
    }
    next()
}

const verifyPostOwner = async (req, res, next) => {
    const verifiedAdmin = req.headers.verifiedAdmin
    if (verifiedAdmin) {
        return next()
    } 
    const header = req.headers.authorization
    const decodedToken = decodeToken(header)

    const postId = Number(req.params.id)
    const post = await getPostByDb(postId)
    const postOwnerId = post.user.id

    if (decodedToken.sub !==  postOwnerId) {
        throw new Error("forbidden")
    }
    next()
}

module.exports = { 
    verifyAdminRole, 
    verifyOwner, 
    verifyPostOwner
 }
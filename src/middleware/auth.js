const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const secret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const header = req.header("authorization");

    if (!header) {
        return res.status(400).json({ error: "Missing auth token" });
    }

    const [_, token] = header.split(" ");

    const verifiedToken = jwt.verify(token, secret);

    // console.log("VERIFIED TOKEN--------->", verifiedToken)

    const foundUser = await prisma.user.findUnique({
        where: {
            id: Number(verifiedToken.sub),
        },
    });

    if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
    }

    delete foundUser.passwordHash;

    // console.log("FOUND USER---->",foundUser)

    req.user = foundUser;
    next();
};

const verifyUserOwnsPostOrAdmin = async (req, res, next) => {
    const paramId = Number(req.params.id);
    const userId = Number(req.user.id)

    const foundPost = await prisma.post.findUnique({
        where: {
            id: paramId
        }
    })

    const authorId = Number(foundPost.userId)

    if (authorId === userId || req.user.role === "ADMIN"){
        return next()
    }

    return res.status(403).json({ error: "Forbidden" })
}

const verifyAdminRole = (req, res, next) => {
    const id = Number(req.params.id);
    
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
    }
    if (req.user.id === id) {
        return next();
    }
    if (req.user.role !== "ADMIN") {
        res.status(403).json({ error: "Forbidden" });
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAdminRole,
    verifyUserOwnsPostOrAdmin
};

const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const secret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const header = req.header("authorization");

    if (!header) {
        return res.status(400).json({ message: "missing auth token" });
    }

    const [_, token] = header.split(" ");

    const verifiedToken = jwt.verify(token, secret);

    const foundUser = await prisma.user.findUnique({
        where: {
            id: Number(verifiedToken),
        },
    });

    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    delete foundUser.password;
    req.user = foundUser;
    next();
};

const verifyAdminRole = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Forbidden" });
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAdminRole,
};

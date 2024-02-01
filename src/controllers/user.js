const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createUserDb, getUsersDb } = require("../domains/user.js");

const createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }
        const createdUser = await createUserDb(username, password);

        return res.status(201).json({ user: createdUser });
    
};

const getUsers = async (req, res) => {
    const foundUsers = await getUsersDb()
    return res.status(200).json({users: foundUsers})
}

module.exports = {
    createUser,
    getUsers
};

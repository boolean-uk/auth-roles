const { createUserDb, getUsersDb } = require("../domains/user.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }
        const createdUser = await createUserDb(username, password, role);

        const token = jwt.sign(createdUser.id, secret)

        return res.status(201).json({ user: createdUser, token: token });
    
};

const getUsers = async (req, res) => {
    const foundUsers = await getUsersDb()
    return res.status(200).json({users: foundUsers})
}

module.exports = {
    createUser,
    getUsers
};

const {
    createUserDb,
    getUsersDb,
    deleteUserDb,
} = require("../domains/user.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Missing fields in request body",
        });
    }
    const createdUser = await createUserDb(username, password, role);

    const token = jwt.sign({ sub: createdUser.id }, secret);

    return res.status(201).json({ user: createdUser, token: token });
};

const getUsers = async (req, res) => {
    const foundUsers = await getUsersDb();
    return res.status(200).json({ users: foundUsers });
};

const deleteUser = async (req, res) => {
    const currentUserId = Number(req.user.id);
    const id = Number(req.params.id);

    if (id === currentUserId || req.user.role === "ADMIN") {
        const deletedUser = await deleteUserDb(id);
        return res.status(200).json({ user: deletedUser });
    }

    return res.status(403).json({ error: "Forbidden" });
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
};

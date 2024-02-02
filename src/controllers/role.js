const { createRoleDb } = require("../domains/role")

const createRole = async (req, res) => {
    const { name } = req.body
    const role = await createRoleDb(name)
    res.status(201).json({ role })
}

module.exports = { createRole }
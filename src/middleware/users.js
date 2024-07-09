const prisma = require('../utils/prisma')


async function verifyAdmin(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {id: req.id}
    })

    if (req.method === 'DELETE' && user.id === Number(req.params.id)) {
        return next()
    }
   
    if (user.role !== 'ADMIN') {
        return res.status(403).json( {error: 'Access denied - must be admin to access'} )
    }

    next()
}

module.exports = { verifyAdmin }
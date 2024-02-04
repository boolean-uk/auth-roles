const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const prisma = require('../utils/prisma')

const verifyToken = async (req, res, next)=>{
    const headerAuth = req.headers.authorization
    if(!headerAuth){
        res.status(400).json({message:'Token is missing'})
    }
    const [_, token ]= headerAuth.split(' ');

    try{
      const verifiedToken = jwt.verify(token, secret)  

      const verifyAccess = await prisma.user.findUnique({
        where:{
            username: verifiedToken.username
        }
      })

      console.log(verifyAccess.role)

      if(verifyAccess.role !== 'ADMIN' ){
        res.status(403).json({message: "You're cant have access to the users"})
      }
    }catch(err){
        return res.status(400).json({'This is the err': err})

    }
    next()
}

module.exports = {verifyToken}


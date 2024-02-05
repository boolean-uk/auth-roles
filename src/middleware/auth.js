const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const prisma = require('../utils/prisma')

const verifyToken = async (req, res, next)=>{
    const headerAuth = req.headers.authorization
    const id = Number(req.params.id);

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
      console.log('id is......', verifyAccess.id === id)
      console.log('data base id', verifyAccess.id)
      console.log('params id', id )

      if(verifyAccess.role !== 'ADMIN' && verifyAccess.id !== id){
       return res.status(403).json({message: "You're not allowed"})
      }
    }catch(err){
        return res.status(400).json({'This is the err': err.message})

    }
    next()
}

module.exports = {verifyToken}


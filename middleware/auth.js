const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next)=>{
    
    try{
    const token = req.cookies.jwt
    // const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token, 'thisisthecourse')
    const user = await User.findOne({_id:decode._id, "User.tokens":"token"})
    if(!user){
        throw new Error()
    }

    req.token = token
    req.user = user
    next()

    }catch(e){
        res.status(401).send({"Error":"Please authenticate"})

    }
}

module.exports = auth
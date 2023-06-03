const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('../mongoose/mongoose')

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    area:{
        type:String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true        
    },
    password:{
        type: String,
        required: true
    },
    join_date:{
        type: Date,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
})

userSchema.virtual('box',{
    ref: "Box",
    localField:'_id',
    foreignField:'box_owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    // console.log(user)
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject._id
    delete userObject.username
    return userObject
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
        next()
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'thisisthecourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password)=>{
    const user = await User.findOne({username})
    if(user===null){
        throw new Error('unable to login. user not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('unable to login user not match')
    }
    return user
}

const User = mongoose.model("User", userSchema)

module.exports = User
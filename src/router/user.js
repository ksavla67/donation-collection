const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Box = require('../../models/box')
const auth = require('../../middleware/auth')
const mongoose=require('mongoose')


router.get('/', (req,res)=>{
    res.render('index')
})

// *********add user********
router.post('/register', async (req,res)=>{
    
    const user = new User(req.body)
    const data = await User.findOne({firstname:user.firstname})
        if(data){
         return res.status(400).send("duplicate record")
        }
    try{   
        
        const token = await user.generateAuthToken()
        res.cookie("jwt", token) 
        await user.save()
        
        req.flash('msg1', 'Registered successfullu')
        res.status(201).render('login')
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/addbox', auth, async(req, res)=>{
    const users = await User.find()
    const boxno = await Box.find()
    res.render('addbox',{
            fname: req.user.firstname,
            lname: req.user.lastname,
        cnames:users,
        boxno:boxno
    })
})

// **************login page**********
router.post('/login', async(req,res)=>{
    console.log(req.body)
       try{
            
    const user = await User.findByCredentials(req.body.username, req.body.password)
    // console.log(user.firstname)
    if(user===null){
        // req.flash('msg2', "Wrong Credentials")
        return res.status(400).send("Incorrect credentials entered. try again")
    }
    const token = await user.generateAuthToken()
    res.cookie("jwt", token)
        
    res.render('box',{
        fname: user.firstname,
        lname: user.lastname})
       }catch (e){
        // req.flash('msg2')
        console.log(e)
        res.status(400).render('login')
       }    
})

// **************user logout***********
router.post('/logout', auth, async(req,res)=>{
    try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            res.clearCookie('jwt')
            await req.user.save()
            res.status(200).redirect('/users/login')
    }catch (e) {
            res.status(500).send()
    }
})

// ********find user***********
router.get('/profile', auth, async(req,res)=>{
    try{
        const data = await User.findOne({_id:req.user._id})
        res.render('profile',{
            fname: data.firstname,
            lname: data.lastname,
            data: data
        })
    }
    catch(e){
        res.status(501).send(e)
    }
})

// **********update user***********
router.patch('/user/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["firstname", "password"]
    const validupdate = updates.every((update)=> allowedUpdates.includes(update))

    if (!validupdate) {
        return res.status(404).send({Error :"invalid update"})
    }
    
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
        
})

// ***********delete user************
router.delete('/user', auth, async(req,res)=>{
    
    const user = req.body
    const doexist = await User.findOne({firstname:user.firstname, lastname:user.lastname})
    
    if(!doexist){
                return res.status(404).send("user not found")
    }
    
    try{
        await User.findOneAndDelete({firstname:user.firstname})
        res.status(200).send(doexist)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Box = require('../../models/box')
const collection = require('../../models/collection')
const auth = require('../../middleware/auth')
const mongoose=require('mongoose')



router.get('/collection', auth, async(req, res)=>{
    const name = req.user.firstname+" "+req.user.lastname
    const box_details = await Box.find({collector_mumukshu_id:req.user._id})
    console.log(box_details)
    console.log(name)
    try{
        res.render('collection',{
            fname: req.user.firstname,
            lname: req.user.lastname,
            mobile: req.user.mobile,
            name:name,
            box_details:box_details
        })
    }catch(e){
        res.send(e)
    }
    

})

router.post('/collection', auth, async(req, res)=>{
    const name = req.user.firstname+" "+req.user.lastname
    console.log(req.user)
    // const name1 = await Box.find({})
    const collection = new collectiondata({
        ...req.body,
        "collector": name
    })
    await collection.save()
    // res.status(201).send(collection)
    res.status(200)
})

module.exports = router
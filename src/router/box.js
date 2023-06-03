const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Box = require('../../models/box')
const auth = require('../../middleware/auth')
const mongoose=require('mongoose')

// *********add box**********
router.post('/box', auth, async(req,res)=>{
    const collector_mumukshu = await User.findOne({mobile:req.body.collector_mumukshu_no})
    const box = new Box({
        ...req.body,
        collector_mumukshu_name: collector_mumukshu.firstname+" "+collector_mumukshu.lastname,
        collector_mumukshu_no: collector_mumukshu.mobile,
        collector_mumukshu_id: collector_mumukshu._id,
        box_owner: req.user
    })
    const doexist = await Box.findOne({box_no:box.box_no})
    if(doexist){
        return res.status(400).send("box already exists")
    }
    try{
        
        await box.save()
        res.status(201).send(box)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// ***********find box***************
router.get('/box', auth, async(req,res)=>{

        // let data = ""
        try{
        if(req.query.box_no==""){
            const data = await Box.find({box_owner:req.user}).populate({path:'box_owner'})
            return res.status(200).render('boxdata',{data})
        }
        
        const data = await Box.find({box_owner:req.user, box_no:req.query.box_no}).populate({path:'box_owner'})
        if(data==""){
        
            return res.status(404).send('box not found')    
        }

        res.status(200).render('boxdata',{data})
    }
    catch(e){
        res.status(500).send(e)
    }
})

// **********delete box**************
router.delete('/box', async(req,res)=>{
    const box = req.body
    const doexist = await Box.findOne({box_no:box.box_no})

    if(!doexist){
        return res.status(404).send("box not found")
    }
    try{
        await Box.findOneAndDelete({box_no:box.box_no})
        res.status(200).send(box)
    }
    catch(e){
        res.status(500).send(e)
    }
})



module.exports = router



const express = require('express')
const User=require('../models/user')
const router = new express.Router()

router.post('',async (req,res)=>{
   // console.log(req.body)
   // res.send('Hello')

    const user=new User(req.body)
    try{

        await user.save()
        const temp= await user.givingTemperature()
        res.status(201).send({user,temp})  
    } catch(e){
        res.status(500).send('Error is occured')    
    }

})


router.post('/login',async (req,res)=>{
    console.log("Inside Post of login")
    try {
        const user = await User.findByDetails(req.body.BarcodeID)
        console.log(req.body)
        console.log(user+"In Login post")
        //const appp=user.neww()
        const temp=  await user.givingTemperature()
        console.log(temp)
        res.send({user,temp})
    } catch (e) {
        res.status(400).send("Unable to send anything...Pl check program")
    }
})
module.exports=router
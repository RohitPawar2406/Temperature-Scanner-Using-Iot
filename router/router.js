const express = require('express')
const User=require('../models/user')
const router = new express.Router()

router.post('',async (req,res)=>{

    //Saving New Data
    const user=new User(req.body)
    try{

        await user.save()
       // const temp= await user.givingTemperature()
        res.status(201).send({user})  
    } catch(e){
        res.status(500).send('Error is occured')    
    }

})

router.post('/login',async (req,res)=>{
    console.log("Inside Post of login")
    try {
        const user = await User.findByDetails(req.body.BarcodeID)
        console.log(typeof(user)+' is of this type')
        const temp= await user.givingTemperatureAndTime_Date()
        console.log("Value of temp is "+ temp)
        res.send({user,temp})

         //const appp=user.neww()
         // const temp=  await user.givingTemperature()
        //console.log(temp)
        //res.send({user,temp})
    } catch (e) {
        res.status(400).send("Unable to send anything...Pl check program")
    }
})

router.get('/findAll',async (req,res)=>{

    try{
    const user= await User.find({})
    if(user ===0)
    { throw new Error }
    res.send(user)
    }catch(e){
        res.status(400).send('Unable to get Data...!!')
    }
})


module.exports=router
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

router.get('/Name',async(req,res)=>{

    const Username=req.body.name
    try{
        const ArrayOfName= await User.find({name:Username})
        console.log(ArrayOfName)
        res.send(ArrayOfName)
    }catch(e)
    {
        res.status(400).send('Unable to get Data...!!')
    }
})

router.get('/test',async(req,res)=>{

    const DD = "2-5-2020"
    var simpleArray=[]
    console.log("Type of DD is "+typeof(DD))
    try{
        const user= await User.find({})
        const user1=user.map((variable)=>{
            console.log("This is information is about "+variable.name)
            const user2=variable.Temperature.map((variable2)=>{
                if(variable2.date === DD)
                { var fullInfo=variable2.temp}
                return fullInfo
               
            }) 
            //console.log("Value of user2 is "+user2)  
            user2.forEach((varr)=>{
                //console.log(varr)
                if(varr !== undefined) {
                    //console.log(variable.name, varr)
                    var Info=simplefunction(variable.name,varr)
                    console.log("Type of Info is "+typeof Info) 
                   //console.log("Value of simplearray is inside "+simpleArray)
                }     
            })
        })
        //console.log("Final Value of user is=="+user1)
        
        }catch(e){
            res.status(400).send('Unable to get Data...!!')
        }

})

var simplefunction=function(n,v){
    var Infoo ={name:n, lastName:v}
        //console.log(Infoo)
        //Infoo.printInfo()
    return Infoo
}

module.exports=router
const express = require('express')
const User=require('../models/user')
const router = new express.Router()

router.post('',async(req,res)=>{

    var barcode=req.body.BarcodeID
    const user= await User.findByDetails(barcode)
    console.log("Vlaue of user is ",user)
    if(user!==null)
    {
        console.log("Inside IF")
        const temp= await user.givingTemperatureAndTime_Date()
        res.send({user,temp})
    }
    else
    {
        console.log("Barcode is not found...")
        const user=new User(req.body)
        await user.save()
        const temp= await user.givingTemperatureAndTime_Date()
        res.send({user,temp})
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
 
var object={first:req.body.startDate,second :req.body.endDate}
var datetime = require('node-datetime')
var dt = datetime.create(object.first)

var dates = dt.getDatesInRange(datetime.create(object.second))

const  rangeOfdates=[]
const user1=dates.map((variable)=>{
    var objecttoString=JSON.stringify(variable._now)
    const newDateString=objecttoString.slice(1,11)

    //Below is ranges of dates in form of string.
    rangeOfdates.push(newDateString)
    }) 

console.log("Total Dates in range is form of Array "+rangeOfdates) 

//Above Code Gives you a Array which will contain all dates in that range of start Date and 
//End date in a form of array. That all dates are in form of string in rangeOfDates Array.

    var obj={}
    var SimpleArray=[]
    try{
        var user=await User.find({})
        rangeOfdates.forEach(element => {
            var user11=user.map((variable)=>{
                var user2=variable.Temperature.map((variable2)=>{
                    if(element==variable2.date)
                    {
                        console.log(variable2.temp,variable2.time,variable2.date)
                        obj={Tempo:variable2.temp,Time:variable2.time, CuurentDate:variable2.date}
                        SimpleArray.push(obj)
                    }
                })
                })
        })
        res.send(SimpleArray)
    }catch(e){
            res.status(400).send('Unable to get Data...!!')
        }

})

module.exports=router
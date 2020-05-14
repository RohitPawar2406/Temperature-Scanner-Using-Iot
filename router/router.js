const express = require('express')
const User=require('../models/user')
const router = new express.Router()

router.post('',async(req,res)=>{

    console.log('In post')
        var barcode=req.body.BarcodeID
        var tempFromOutside=req.body.temperature
       if(barcode ===undefined && tempFromOutside===undefined)
        {
          return res.send("Please Provide Barcode And Temperature.")
        }
    
        try{
            const user= await User.findByDetails(barcode)
            console.log("Value Of user is "+user)
            if(user!==null)
            {
                const temp = await user.givingTemperatureAndTime_Date(tempFromOutside)
                res.send({user,temp})
            }
            else
            {
                console.log("Inside Else Part.")
                const user=new User(req.body)
                console.log("Value of User is "+user)
                await user.save()
                const temp = await user.givingTemperatureAndTime_Date(tempFromOutside)
                await user.saveToExcel(user.Temperature)
                res.send({user,temp})
            }
            }catch(e){
                console.log(e)
                res.status(400).send('Unable to Save Data')
            }
    })
    


router.get('/findAll',async (req,res)=>{

    try{
    const user= await User.find({})
    if(user === 0)
    { throw new Error }
    res.send(user)
    }catch(e){
        res.status(400).send('Unable to get Data...!!')
    }
})

router.post('/barcode',async(req,res)=>{

    const barcode = req.body.BarcodeID
    if(barcode==undefined)
    {res.send("Please Enter BarcodeID To Search.")}
    try{
        const name = await User.find({BarcodeID:barcode})
        console.log(name)
        res.send(name)
    }catch(e)
    {
        res.status(400).send('Unable to get Data from barcode...!!')
    }
})

router.get('/test',async(req,res)=>{

var object={first:req.body.startDate,second :req.body.endDate}
if(object.first==undefined && object.second==undefined)
{   res.send("Please Enter Dates to Search.")}
if(object.second ==undefined)
{
    object.second=object.first
}

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
                var naav=variable.name
                var user2=variable.Temperature.map((variable2)=>{
                    if(element==variable2.date)
                    {
                        console.log(variable2.temp,variable2.time,variable2.date)
                        obj={Name:naav,Tempo:variable2.temp,Time:variable2.time, CuurentDate:variable2.date}
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

router.post('/maxtemp',async (req,res)=>{
    console.log('In maxtemp')
    var object={first:req.body.startDate,second :req.body.endDate}
if(object.first==undefined && object.second==undefined)
{  
res.send("Please Enter Dates to Search.")
}

if(object.second ==undefined)
{
    object.second=object.first
}

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

var obj={}
var obj2={}
var finalobj={}
var SimpleArray=[]
var temparray=[]
var finalArray=[]
try{
    var user=await User.find({})
    rangeOfdates.forEach(element => {
        var user11=user.map((variable)=>{
            var naav=variable.name
            var user2=variable.Temperature.map((variable2)=>{
                if(element==variable2.date)
                {
                    console.log(variable2.temp,variable2.time,variable2.date)
                    obj={Name:naav,Tempo:variable2.temp,Time:variable2.time, CuurentDate:variable2.date}
                    SimpleArray.push(obj)
                }
            })
            })
        console.log("Value of SimpleArray is "+SimpleArray[0])    
        var maxTempOfthatDay=Math.max.apply(Math,SimpleArray.map((finalVar)=>{return finalVar.Tempo}))
        console.log("Inside Math MAX...!!!",maxTempOfthatDay)
        var user111=SimpleArray.map((o)=>{
            console.log(o+maxTempOfthatDay)
            console.log(o.Tempo==maxTempOfthatDay) 
            if(o.Tempo==maxTempOfthatDay)
            {
                console.log("HEllo")
                console.log(o.Name,o.Tempo)
                finalobj={Name:o.name,Tempo:o.Tempo,CurrentDate:o.CuurentDate,Time:o.Time}
                finalArray.push(finalobj)
            }
        })  
    })
    console.log(finalArray)
    res.send(finalArray)
}catch(e){
        res.status(400).send('Unable to get Data...!!')
    }

})


module.exports=router
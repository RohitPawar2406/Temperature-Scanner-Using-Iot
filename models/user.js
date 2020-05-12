var xlsx = require('xlsx')
var Excel = require('exceljs')

var wb = new Excel.Workbook();
var file = 'Temp1.xlsx'
var sheet =  wb.addWorksheet('Sheet1')
var next = wb.getWorksheet('Sheet1')
var array = ['BarcodeID', 'Name', 'Temperature', 'Time', 'Date']
next.addRow(array)
const mongoose=require('mongoose')
//var today = new Date();
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true
    },
    BarcodeID:{
        type:String,
        unique:true
    },
    Temperature:[{
        temp:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    }]
})

userSchema.statics.findByDetails=async (BarcodeID)=> {
    console.log("Inside finfdetails...")
    console.log(BarcodeID)
    const user= await User.findOne({BarcodeID})
    console.log("Outside finfdetails...")
    return user
}
userSchema.methods.givingTemperatureAndTime_Date=  async function(TemperatureReading){
    const user=this
    var temp=TemperatureReading
    var today = new Date()
    console.log("Inside Methods...!!!!")
    if((today.getMonth()+1)<10 && (today.getDate())<10)
    {
        var date=today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+'0'+today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        user.Temperature = user.Temperature.concat({temp,date,time})
    }
    else if((today.getMonth()+1)<10 && (today.getDate())>=10) 
    {
        var date=today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        user.Temperature = user.Temperature.concat({temp,date,time})
    }
    else if((today.getMonth()+1)>=10 && (today.getDate())<10)
    {
        var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+'0'+today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        user.Temperature = user.Temperature.concat({temp,date,time})
    }
    else{
    var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    user.Temperature = user.Temperature.concat({temp,date,time})
    }    
    await user.save()
    return temp
}
userSchema.methods.saveToExcel = async function(Temperature)
{
    const user = this
    console.log('Saving to excel')
    let i = Temperature.length -1
    console.log(i)
    // console.log('Temperature is'+ Temperature)
    var array = [user.BarcodeID, user.name, user.Temperature[i].temp , user.Temperature[i].time, user.Temperature[i].date]
    console.log(array)
    await next.addRow(array)
        wb.xlsx.writeFile(file).then(function(){
                console.log('Added')
        })  
}
const User = mongoose.model('User', userSchema)

module.exports = User
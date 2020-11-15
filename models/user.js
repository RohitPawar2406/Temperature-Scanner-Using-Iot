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
    console.log(BarcodeID)
    const user= await User.findOne({BarcodeID})
    console.log("Inside Statics..!!")
    return user
}
userSchema.methods.givingTemperatureAndTime_Date=  async function(){
    console.log("Inside Methods...!!!")
    const user=this
    var temp="Default Temperature"
    var today = new Date()
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
const User = mongoose.model('User', userSchema)

module.exports = User
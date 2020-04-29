const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    BarcodeID:{
        type:String
    },
    Temperature:[{
        temp:{
            type:String
        }
    }]
})

userSchema.methods.givingTemperature= async function (){
    console.log("Inside Methods...!!!")
    const user=this
    const temp="Default Temperature"
    user.Temperature = user.Temperature.concat({ temp })
    await user.save()
    return temp
}

userSchema.statics.findByDetails=async (BarcodeID)=> {
    console.log(BarcodeID)
    const user= await User.find({BarcodeID})
    console.log("Inside Statics..!!")
    if(!user)
    {
        return 0
    }
    return user
}


const User = mongoose.model('User', userSchema)

module.exports = User
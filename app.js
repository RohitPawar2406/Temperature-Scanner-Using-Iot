const express=require("express")
require('./db/mongoose')
const User=require('./models/user')
const UserRouter=require('./router/router')

const app=express()
const port=process.env.PORT || 3000


app.use(express.json())
app.use(UserRouter)
app.use(express.static(__dirname + '/public'));

app.listen(port,()=>{
    console.log("This is Server "+port)
})


const express=require("express")
require('./db/mongoose')
const User=require('./models/user')
const UserRouter=require('./router/router')

const app=express()
const port=process.env.PORT || 3000


app.use(express.json())
app.use(UserRouter)
app.get('',(req,res)=>{
    res.send("Hello Wordl...!!!")
})

app.get('\id')
app.listen(port,()=>{
    console.log("This is Server "+port)
})
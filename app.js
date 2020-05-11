const express=require("express")
require('./db/mongoose')
const User=require('./models/user')
const UserRouter=require('./router/router')

const app=express()
const port=process.env.PORT || 3000


app.use(express.json())
app.use(UserRouter)
app.set("view engine", "ejs");
app.get('',(req,res)=>{
    res.send("Hello Wordl...!!!")
})



app.get('\id')
app.get('/all',(req,res,next) =>{
    //Here fetch data using mongoose query like
    User.find({}, function(err, users) {
    if (err) throw err;
    res.render('index',{users:users});
  })
})

app.listen(port,()=>{
    console.log("This is Server "+port)
})
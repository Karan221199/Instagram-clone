// dekh jb aapa pwd database me save krte h toh vo sidha show hota h
// toh koi b dekh skta h fr uske liye hm hashing pwd ka use krte h
// taki vo kisi ko dikhe na
//so we use bcryptjs package to do this
const express = require('express')
const mongoose= require('mongoose')
const app=express();
const port = 5000
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI,{
    // do errors aati h ye agr ye niche vale pass na kro

    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo')
})

mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})

// ye sb ek e.g tha bt imp
/*

// middlewares are something or code which takes the incoming requests
// and it modifies it before it reaches to actual route handler
const customMiddleware = (req,res,next) =>{
    console.log("middlewares executed")

    next()
}

//app.use(customMiddleware) // ye gloabbly middleware ko use krne k liye likha jata h

app.get('/',(req,res)=>{
    console.log("home")
    res.send("hello world")
})
// ab jo isme hmne ander likha ye srf ab about page ka middleware h
app.get('/about',customMiddleware,(req,res)=>{
    console.log("about")
    res.send("about page")
})*/



require('./models/User')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(port , ()=>{
    console.log("server is running on", port)
})
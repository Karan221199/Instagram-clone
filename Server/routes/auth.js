// pwd ki theory likhi h app me pdhliyo

const express= require('express')
const bcrypt = require('bcryptjs')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requireLogin=require('../middleware/requireLogin')

// condition :  now if we want to check the token with an example 
// now suppose if user want to acces this protected file he sholud come with token
// then we will verify the token so for that we will be creating a middleware
/*router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})*/

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email  || !password || !name){
        return res.status(422).json({error: "please fill all the fields"})
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "User already exists with that email"}) 
        }
        // ye dekh yha pwd ko kr rhe h aur jo ye no diya h
        // tu apni mrzi se b de skta h kk bigger the no safer will be pwd
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name
            })
            user.save().then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
      
    })
    .catch(err=>{
        console.log(err);
    })
 
})


// if user have successfully signed in we should give it a jsonweb token
// now if user has that same token he will be able to access protected resources or files
// jb b user koi page p aayega toh hm verify krenge token use krke ki vo same token h jo hmne diya tha
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please fill email or password"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        // aa dekh ethe aapa hun encrypted pwd nu aa compare krna
        bcrypt.compare(password,savedUser.password).then(domatch=>{
            if(domatch)
            {
               // res.json({message:"login succesffully"})
               // we are generating the token on user id and assigning it in id
               const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email}=savedUser
               res.json({token,user:{_id,name,email}})
            }
            else
            {
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router
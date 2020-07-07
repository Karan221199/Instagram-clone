// a schema is basically a blueprint

const mongoose=require('mongoose')
const {ObjectId}= mongoose.Schema.Types 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dyhn77mox/image/upload/v1594046530/noimage_gtjarr.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)
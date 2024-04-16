const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

const User = mongoose.model("users",usersSchema)

module.exports=User
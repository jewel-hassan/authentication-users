const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const { encryptKey } = require('../secret/userSecret');



const usersSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"user email must be required"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"user password must be required"],
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})


// ENCRYPTION PASSWORD

// var encKey = encryptKey;
// usersSchema.plugin(encrypt, {
//     secret:encKey,
//     encryptedFields:['password'],
    
    
// });

const user = mongoose.model("users",usersSchema)

module.exports=user
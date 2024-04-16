const mongoose = require('mongoose');


const dbConnected = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("db is connected")
    } catch (error) {
       console.log("db is not connected")
       console.error(error.message)
       process.exit(1); 
    }
}


module.exports=dbConnected
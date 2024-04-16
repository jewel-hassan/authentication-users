const mongoose = require('mongoose');
const { dbLink } = require('../secret/userSecret');

// MONGODB CONNECTED

const dbConnected = async()=>{
    try {
      await mongoose.connect(dbLink)
      console.log("mongodb is connected") 
    } catch (error) {
      console.log("db is not connected")
      console.log(error.message)
      process.exit(1)
    }
  }

  module.exports = dbConnected
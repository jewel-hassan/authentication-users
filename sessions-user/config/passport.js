const passport = require("passport")
const LocalStrategy = require("passport-local");
const bcrypt = require('bcryptjs');
const user = require("../models/userModel");



passport.use(new LocalStrategy(async(username, password, done)=> {
    try {
        const dataUser = await user.findOne({ username: username })
        if (!dataUser) { 
            return done(null, false,{message:"Incorrect username"}); 
        }
        if(!bcrypt.compare(password,dataUser.password)){
            return done(null, false,{message:"Incorrect password"}); 
        }
        return done(null, dataUser);
    } catch (error) {
        return done(err)
    }


     
        
      
    })
  );


  passport.serializeUser((user,done)=>{
    done(null,user)
  })

  passport.deserializeUser(async(id,done)=>{
    try {
        const userData = await user.findById(id)
        done(null,userData)
    } catch (error) {
       done(error,false) 
    }
  })
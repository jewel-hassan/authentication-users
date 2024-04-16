require('dotenv').config()

const passport = require("passport")
const LocalStrategy = require("passport-local");
const bcrypt = require('bcryptjs');
const user = require("../models/userModel");
const UserInfo = require('../models/googleUser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



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


  // GOOGLE AUTH WITH PASSPORT
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        UserInfo.findOne({ googleId: profile.id }, (err, user) => {
          if (err) return cb(err, null);
  
          // not a user; so create a new user with new google id
          if (!user) {
            let newUser = new UserInfo({
              googleId: profile.id,
              username: profile.displayName,
            });
            newUser.save();
            return cb(null, newUser);
          } else {
            // if we find an user just return return user
            return cb(null, user);
          }
        });
      }
    )
  );
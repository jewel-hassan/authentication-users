const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("./models/userModel");
const passport=require("passport")
const saltRounds = 10;

require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(passport.initialize());

require("./config/passport")

// HOME ROUTE

app.get("/", (req, res) => {
  res.status(200).send("<h1>welcome to server</h1>");
});

// REGISTER ROUTE
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) return res.status(400).send("user is already exist");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });

      await newUser
        .save()
        .then((user) => {
          res.status(200).send({
            success: true,
            message: "user create successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((error) => {
          res.status(400).json({
            success: false,
            message: "user is not create",
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// LOGIN ROUTE
app.post("/login", async(req, res) => {

 try {
   // USERNAME MATCH IN MONGODB DATABASE

   const user =await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user is not found",
    });
  }
  // PASSWORD MATCH IN MONGODB DATABASE

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(400).json({
      success: false,
      message: "incorrect password",
    });
  }

  // JSONWEBTOKEN CREATE THEN MATH TOKEN BY LOGIN 
  const payload =  {
    id: user._id,
    username: user.username,
  }
  const token= jwt.sign(payload, process.env.SECRET_KEY,{
    expiresIn:"2d",
  })
  return res.status(200).json({
    success:true,
    message:"user login successfully",
    token: "Bearer"+token
  })
 } catch (error) {
  res.status(500).json({
    success:false,
    message:"user login failed",
    error:error,
  })
 }
});


// profile route
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

// CLINT ERROR
app.use((req, res, next) => {
  res.status(400).send("<h1>400 page is not found!</h1>");
  next();
});

// SERVER ERROR
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;

const user = require("../models/userModel");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

// GET USERS
const getUsers = async (req, res) => {
  try {
    const usersInfo = await user.find();
    res.status(202).json({
      success: true,
      message: "user get successfully",
      data: usersInfo,
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// CREATE REGISTER USER
const createUser = async (req, res) => {
  try {
    // HASSING PASSWORD WITH BCRYPTJS

    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const newUser = new user({
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "user create successfully",
        data: newUser,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGIN USER

const loginUser = async (req, res) => {
  try {
    // HASSING PASSWORD WITH BCRYPTJS

    const email = req.body.email;
    const password = req.body.password;
    const userInfo = await user.findOne({ email: email });
    if (userInfo) {
      bcrypt.compare(password, userInfo.password, function (err, result) {
        if (result === true) {
          res.status(202).json({ message: "valid user" });
        }
      });
    } else {
      res.status(404).json({ message: "user is not valid" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};



module.exports = {
  createUser,
  loginUser,
  
  getUsers,
};

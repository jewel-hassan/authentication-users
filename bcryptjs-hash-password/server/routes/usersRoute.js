const express = require("express")
const { createUser, loginUser,  getUsers } = require("../controllers/usersControllers")
const useRouter = express.Router()

// GET ROUTE

useRouter.get('/users',getUsers)

// REGISTER ROUTE
useRouter.post("/register",createUser)

//LOGIN ROUTE
useRouter.post("/login",loginUser)







module.exports=useRouter;
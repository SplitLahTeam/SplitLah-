const express = require("express")
const userRouter = express.Router()
const {registerUser, loginUser, updateUser} = require("../controllers/userController")

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/', updateUser)

module.exports = userRouter
const express = require("express")
const userRouter = express.Router()
const {registerUser, loginUser, updateUser, logoutUser} = require("../controllers/userController")

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/', updateUser)
userRouter.post('/logout', logoutUser)

module.exports = userRouter
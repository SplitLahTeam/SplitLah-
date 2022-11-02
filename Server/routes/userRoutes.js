const express = require("express")
const userRouter = express.Router()
const {registerUser, loginUser, updateUser, logoutUser, getUserSummary} = require("../controllers/userController")

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/edit', updateUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/summary', getUserSummary)

module.exports = userRouter
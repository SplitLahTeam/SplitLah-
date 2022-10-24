
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

require("dotenv").config()

const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const userRouter = require('./routes/userRoutes')
const groupRouter = require('./routes/groupRoutes')
const transactionRouter = require('./routes/transactionRoutes')

mongoose.connect(MONGO_URI)

app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use('/users',userRouter)
app.use('/groups', groupRouter)
app.use('/transactions', transactionRouter)


app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.post('/seedDataBase', (req,res)=>{

})

mongoose.connection.once("open", ()=>{
    console.log("DB connected")
    app.listen(PORT, ()=>{
        console.log("Server Listening")
    })
})

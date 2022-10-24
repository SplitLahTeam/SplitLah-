
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

require("dotenv").config()

const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
mongoose.connect(MONGO_URI)


app.get('/',(req,res)=>{
    res.send("Hello world")
})



mongoose.connection.once("open", ()=>{
    console.log("DB connected")
    app.listen(PORT, ()=>{
        console.log("Server Listening")
    })
})

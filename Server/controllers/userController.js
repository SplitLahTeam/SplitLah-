
const User = require("../models/user")
const bcrypt = require("bcrypt")

const registerUser = (req,res)=>{
// req should contain - All schema entries of "User" collection
}

const loginUser = (req, res)=>{
// req should contain - email and password
}

const updateUser = (req, res) => {
// req should contain - All schema entries of "User" collection
}

module.exports = {registerUser, loginUser, updateUser}
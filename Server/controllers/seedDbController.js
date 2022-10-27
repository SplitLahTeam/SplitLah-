
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Group = require('../models/group')
const Transaction = require('../models/transaction')

const userData = require('../misc/seedData/userData')
const groupData = require('../misc/seedData/groupData')
const transactionData = require('../misc/seedData/transactionData')

const seedDbdata = async (req,res) => {
    console.log(userData)
    try {
        const deletedData = await User.deleteMany({})
        const updatedData = await User.create(userData)
        res.json(updatedData)
    } catch (error) {
        res.json(error)
    }
    
}

module.exports = seedDbdata
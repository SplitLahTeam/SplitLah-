
const User = require('../models/user')
const Group = require("../models/group")
const Transaction = require("../models/transaction")

const registerGroup = (req, res) => {
// req should contain - All schema entries of "Group" collection
const name = req.body.name
const userList = req.body.userList
if ((!name)||(!userList)) {
    res.status(400).json({msg: "Inadequate Details to register a group"})
    return
}

let invalidUserId = false
userList.forEach((userId)=>{
    const user = User.findById(userId)
    if (!user) {
        res.status(400).json({msg: "Inaccurate user ID details"})
        invalidUserId = true
        return
    }
})
if (invalidUserId) {return}

try {
    const newGroup = Group.create({name, userList})
    res.status(201).json({msg:"New group registed",
    name: newGroup.name})
} catch (error) {
    res.status(500).json({msg: "Some Server Error"})
}
}



const updateGroup = (req, res) => {
// req should contain - All schema entries of "Group" collection
    const id = req.body.id
    const name = req.body.name
    const userList = req.body.userList

    if ((!id)||(!name)||(!userList)) {
        res.status(400).json({
            msg: ""
        })
    }
}

const getGroupsSummary = (req, res) => {
// req should contain - UserID

}

const getGroupDetails = (req,res) => {
// req should contain - UserID and GroupID

}

module.exports = {registerGroup, updateGroup, getGroupsSummary, getGroupDetails}


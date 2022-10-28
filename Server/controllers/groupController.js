
const User = require('../models/user')
const Group = require("../models/group")
const Transaction = require("../models/transaction")

const registerGroup = async (req, res) => {
// req should contain - All schema entries of "Group" collection
const name = req.body.name
const userList = req.body.userList
if ((!name)||(!userList)) {
    res.status(400).json({msg: "Inadequate Details to register a group"})
    return
}

let invalidUserId = false
userList.forEach(async (userId)=>{
    const user = await User.findById(userId)
    if (!user) {
        res.status(400).json({msg: "Inaccurate user ID details"})
        invalidUserId = true
        return
    }
})
if (invalidUserId) {return}

try {
    const newGroup = await Group.create({name, userList})
    res.status(201).json({msg:"New group registed",
    name: newGroup.name})
} catch (error) {
    res.status(500).json({msg: "Some Server Error"})
}
}


const updateGroup = async (req, res) => {
// req should contain - All schema entries of "Group" collection
    const id = req.body.id;
    const name = req.body.name
    const userList = req.body.userList

    try {

        if ((!id)||(!name)||(!userList)) {
            res.status(400).json({
                msg: "Inadequate Details to update group"
            })
            return
        }
        const group = await Group.findById(id)
        if (!group){
            res.status(400).json({
                msg: "No group found for given ID"
            })
            return
        }
        const invalidUserId = false
        userList.forEach((userId) => {
            const user = User.findById(userId)
            if (!user){
                invalidUserId = true
                res.status(400).json({
                    msg: "Inaccurate user ID details"
                })
                return
            }
        }) 
        if (invalidUserId) {return}
        
        group.name = name
        group.userList = userList
        await group.save()
        res.status(202).json({msg: "Group Updated"})
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
}

const getGroupsSummary = async (req, res) => {
// req should contain - UserID

}

const getGroupDetails = async (req,res) => {
// req should contain - UserID and GroupID

}

module.exports = {registerGroup, updateGroup, getGroupsSummary, getGroupDetails}


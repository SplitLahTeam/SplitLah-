
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

const getTransactions = async (userId, groupId) => {
    try{
        const transactions = {}

        const  receivedTransactionDocuments = await Transaction.find({receivedBy:userId, groupId:groupId})
        const receivedTransactions = {}
        receivedTransactionDocuments.forEach((transaction)=>{
            if (receivedTransactions[String(transaction.paidBy)]){
                receivedTransactions[String(transaction.paidBy)].push(transaction.amount)
            } else {
                receivedTransactions[String(transaction.paidBy)] = [transaction.amount]
            }
        })
        transactions.recevedAmounts = receivedTransactions
        
        const paidTransactionsDocuments = await Transaction.find({paidBy:userId, groupId:groupId})
        const paidTransactions = {}
        paidTransactionsDocuments.forEach((transaction)=>{
            if (paidTransactions[String(transaction.receivedBy)]){
                paidTransactions[String(transaction.receivedBy)].push(transaction.amount)
            } else {
                paidTransactions[String(transaction.receivedBy)] = [transaction.amount]
            }
        })

        return {receivedTransactions, paidTransactions}
    }catch (error){
        res.status(500).json({msg:"Transaction collection Error"})
    }
}

const getGroupsSummary = async (req, res) => {
// req should contain - UserID
    try {
        const userId = req.body.userId
        if (!userId){
            res.status(400).json({msg: "No UserID found"})
            return
        }
        const user = await User.findById(userId)
        if (!user){
            res.status(400).json({msg: "Invalid UserID"})
            return
        }
        const groups = await Group.find({
            userList : { $all : [userId]}
        })
        const groupsSummaryList = []
        for (const group of groups){
            const transactions = await getTransactions(userId, group._id)
            const groupSummary = {}
            groupSummary.id = group._id
            groupSummary.name = group.name

            let [amountReceived, amountPaid] = [0,0]
            for (const user in transactions.receivedTransactions){
                amountReceived = amountReceived + transactions.receivedTransactions[user].reduce((prev,curr)=>(prev+curr),0)
            }
            for (const user in transactions.paidTransactions){
                amountPaid = amountPaid + transactions.paidTransactions[user].reduce((prev,curr)=>(prev+curr),0)
            }
            groupSummary.amountToReceive = amountPaid - amountReceived
            groupsSummaryList.push(groupSummary)
        }
        res.status(200).json(groupsSummaryList)
    } catch (error){
        res.status(500).json({msg: "Server Error"})
    }
}

const getGroupDetails = async (req,res) => {
// req should contain - UserID and GroupID
    try{
        const userId = req.body.userId
        const groupId = req.body.groupId
        if (!groupId) {
            res.status(400).json({msg: "No group ID found"})
        }
    
        const transactions = await getTransactions(userId, groupId)
        const users = [... new Set(Object.keys(transactions.receivedTransactions).concat(Object.keys(transactions.paidTransactions)))]
        const groupDetails = []
    
        for (const user of users){
            const userDetails = {}
            userDetails.id = user
            userDetails.name = (await User.findById(user)).name
            const amountReceived = transactions.receivedTransactions[user]?.reduce((prev,curr)=>(prev+curr),0) || 0
            const amoutPaid = transactions.paidTransactions[user]?.reduce((prev,curr)=>(prev+curr),0) || 0
            userDetails.amountToRecieve = amoutPaid-amountReceived
            groupDetails.push(userDetails)
        }
        res.status(200).json(groupDetails)

    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
}

module.exports = {registerGroup, updateGroup, getGroupsSummary, getGroupDetails}


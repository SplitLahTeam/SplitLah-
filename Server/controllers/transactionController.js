
const Transaction = require('../models/transaction')

const getPaidTransactions = async (req,res) => {
// req should contain - userID and groupID
    try {
        const userId = req.session.userId
        const groupId = req.body.groupId
        const pageNum = req.body.pageNum - 1
        const paidTransactionList = await Transaction.find({groupId, paidBy:userId},["receivedBy","amount","description","createdAt","updatedAt"],{limit:10,skip:(10*pageNum)})

        res.status(200).json(paidTransactionList)
    } catch(error){
        console.log(error)
        res.status(500).json({msg: "Unknown Server Error"})
    }    
}

const getReceivedTransactions = async (req,res) => {
    // req should contain - userID and groupID
    try {
        const userId = req.session.userId
        const groupId = req.body.groupId
        const pageNum = req.body.pageNum - 1
        const receivedTransactionList = await Transaction.find({groupId, receivedBy:userId},["paidBy","amount","description","createdAt","updatedAt"],{limit:10, skip:(10*pageNum)})
        res.status(200).json(receivedTransactionList)
    }catch (error){
        console.log(error)
        res.status(500).json({msg: "Unknown Server Error"})
    }
    }
    
const registerTransaction = (req,res) => {
// req should contain - All schema entries of "Transaction" collection
}

const updateTransaction = (req, res) => {
// req should contain - All schema entries of "Transaction" collection
}

module.exports = {getPaidTransactions, getReceivedTransactions, registerTransaction, updateTransaction}
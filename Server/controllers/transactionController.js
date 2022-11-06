
const Transaction = require('../models/transaction')
const User = require('../models/user')

const getPaidTransactions = async (req,res) => {
// req should contain - userID and groupID
    try {
        const userId = req.session.userId
        const groupId = req.body.groupId
        const pageNum = req.body.pageNum - 1
        const paidTransactionListRaw = await Transaction.find({groupId, paidBy:userId},["receivedBy","amount","description","createdAt","updatedAt"],{limit:10,skip:(10*pageNum)})

        const paidTransactionList = []
        for (const transactionRaw of paidTransactionListRaw){
            const transaction = transactionRaw.toObject()
            const nameRecord = await User.findById(transaction.receivedBy,["name"])
            transaction.receivedByName = nameRecord.name
            paidTransactionList.push(transaction)
        }

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
        const receivedTransactionListRaw = await Transaction.find({groupId, receivedBy:userId},["paidBy","amount","description","createdAt","updatedAt"],{limit:10, skip:(10*pageNum)})
        const receivedTransactionList = []
        for (const transactionRaw of receivedTransactionListRaw) {
            const transaction = transactionRaw.toObject()
            const nameRecord = await (User.findById(transaction.paidBy))
            transaction.paidByName = nameRecord.name
            receivedTransactionList.push(transaction)
        }
        console.log("Txn list", receivedTransactionList)
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
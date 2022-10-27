const express =require("express")
const transactionRouter = express.Router()
const {getTransactions, registerTransaction, updateTransaction} = require('../controllers/transactionController')

transactionRouter.get('/', getTransactions)
transactionRouter.post('/register', registerTransaction)
transactionRouter.put('/', updateTransaction)

module.exports = transactionRouter
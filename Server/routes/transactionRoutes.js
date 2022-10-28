const express =require("express")
const transactionRouter = express.Router()
const {getTransactions, registerTransaction, updateTransaction} = require('../controllers/transactionController')
const {protect} = require("../middleware/protect")

transactionRouter.get('/', protect, getTransactions)
transactionRouter.post('/register', protect, registerTransaction)
transactionRouter.put('/', protect, updateTransaction)

module.exports = transactionRouter
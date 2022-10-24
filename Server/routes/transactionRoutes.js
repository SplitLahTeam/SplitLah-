const express =require("express")
const transactionRouter = express.Router()
import {getTransactions, registerTransaction, updateTransaction} from '../controllers/transactionController'

transactionRouter.get('/', getTransactions)
transactionRouter.post('/register', registerTransaction)
transactionRouter.put('/', updateTransaction)

module.exports = transactionRouter
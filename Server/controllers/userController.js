
const User = require("../models/user")
const Group = require("../models/group")
const Transaction = require("../models/transaction")
const bcrypt = require("bcrypt")

const registerUser = (req,res)=>{
// req should contain - All schema entries of "User" collection
}


const loginUser = async (req, res)=>{
// req should contain - email and password
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)

    if (!email) {
        res.status(400).json({msg: "Login Email-ID cannot be blank"})
        return
    }

    try{
        const user = await User.findOne({email}).exec()
        if (!user) {
            res.status(404).json({msg: "User not found"})
            return
        }

        const loginPass = bcrypt.compareSync(password, user.password)
        if (loginPass){
            req.session.userId = user._id
            res.status(202).json({msg: "Successful Login", 
        id: user._id,
        name: user.name,
        email: user.email})
        } else {
            req.sesssion.userId = null
            res.status(401).json({msg: "Inaccurate Password"})
        }
    } catch (error) {
        res.status(500).json({msg: "Unknown Server Error"})
    }
}


const updateUser = (req, res) => {
// req should contain - All schema entries of "User" collection

}


const logoutUser = (req, res) => {
    try{
        if (!req.session.userId){
            res.status(400).json({msg: "No user to log-out"})
            return
        }
        req.session.userId = null
        res.status(202).json({msg: "User successfully logged out!"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg: "Unknown erver error"})
    }
}


const getUserSummary = async (req,res) => {
    try {
        const userId = req.session.userId
        const user = await User.findById(userId, ["name"])
        const groupList = await Group.find({userList : {$all: [userId]}},["name"])
        const transactionReceivedList = await Transaction.find({receivedBy:userId},["_id","paidBy","amount","description","updatedAt"],{limit:10, sort:{updatedAt: -1}})
        const transactionPaidList = await Transaction.find({paidBy:userId},["_id","paidBy","amount","description","updatedAt"],{limit:10, sort:{updatedAt: -1}})
        const transactionReceivedAmountList = await Transaction.find({receivedBy:userId},["amount"])
        const transactionPaidAmountList = await Transaction.find({paidBy:userId},["amount"])
        const netReceivedAmount = (transactionReceivedAmountList.map((transaction)=>transaction.amount)).reduce((prev,curr)=>(prev+curr),0)
        const netPaidAmount = (transactionPaidAmountList.map((transaction)=>transaction.amount)).reduce((prev,curr)=>(prev+curr),0)
        res.status(200).json({user, groupList, transactionReceivedList, transactionPaidList, netReceivedAmount,netPaidAmount});

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Unknown Server Error"})
    }
}


const checkLogin = async (req, res)=>{
        try{
            const user = await User.findById(req.session.userId).exec()
            if (!user) {
                res.status(404).json({msg: "User not found"})
                return
            }    
            res.status(200).json({msg: "Login", 
            id: user._id,
            name: user.name,
            email: user.email})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Unknown Server Error"})
        }
    }
    

module.exports = {registerUser, loginUser, updateUser, logoutUser, getUserSummary, checkLogin}
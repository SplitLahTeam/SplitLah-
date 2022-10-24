const express = require("express")
const groupRouter = express.Router()

const {registerGroup, updateGroup, getGroupsSummary, getGroupDetails} = require("../controllers/groupController")

groupRouter.post('/register', registerGroup)
groupRouter.put('/', updateGroup)
groupRouter.get('/summary', getGroupsSummary)
groupRouter.get('/details', getGroupDetails)

module.exports = groupRouter
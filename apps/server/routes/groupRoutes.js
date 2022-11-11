const express = require("express")
const groupRouter = express.Router()

const {registerGroup, updateGroup, getGroupsSummary, getGroupDetails} = require("../controllers/groupController")
const {protect} = require("../middleware/protect")

groupRouter.post('/register', protect, registerGroup)
groupRouter.put('/edit', protect, updateGroup)
groupRouter.get('/summary', protect, getGroupsSummary)
groupRouter.post('/details',protect, getGroupDetails)

module.exports = groupRouter
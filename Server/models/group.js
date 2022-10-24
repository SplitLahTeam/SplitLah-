const mongoose=require("mongoose")

const groupSchema = new mongoose.Schema({
    name: String,
    userList: [{type: mongoose.Schema.Types.ObjectId, ref:"user"}]
}, {
    timestamps:true
})

const groupModel = mongoose.model("group", groupSchema)

module.exports = groupModel
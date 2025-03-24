const mongoose = require('mongoose')


const conversationShema = new mongoose.Schema({
    participants : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    lastMessage : {type:mongoose.Schema.Types.ObjectId, ref:"Message"},
},{timestamps:true})


module.exports = mongoose.model("Conversation",conversationShema)
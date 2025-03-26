const mongoose = require('mongoose')


const conversationShema = new mongoose.Schema({
    participants : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    lastMessage : {type:String},
    job : {type:mongoose.Schema.Types.ObjectId, ref:"Job"}
},{timestamps:true})


module.exports = mongoose.model("Conversation",conversationShema)
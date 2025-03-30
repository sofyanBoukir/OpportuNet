const mongoose = require("mongoose")


const messageShema = new mongoose.Schema({
    conversation : {type:mongoose.Schema.Types.ObjectId, ref:"Conversation"},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post : {type:mongoose.Schema.Types.ObjectId, ref: "Post"},
    message : {type:String},
},{timestamps:true})


module.exports = mongoose.model("Message",messageShema)
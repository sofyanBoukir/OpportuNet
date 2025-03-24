const mongoose = require("mongoose")


const messageShema = new mongoose.Schema({
    conversation : {type:mongoose.Schema.Types.ObjectId, ref:"Conversation"},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    message : {type:String},
    status : {type: String, default:"Delivred"}
},{timestamps:true})


module.exports = mongoose.model("Message",messageShema)
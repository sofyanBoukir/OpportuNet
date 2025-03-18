const mongoose = require("mongoose")
const notificationShema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    from_user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post : {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    message : {type:String, required:true},
    status : {type:String},
    // comment : {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
},{timestamps:true});

module.exports = mongoose.model('Notification',notificationShema);
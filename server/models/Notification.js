const mongoose = require("mongoose")
const notificationShema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    from_user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post : {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    message : {type:String, required:true},
    status : {type:String, default:"delivred"},
},{timestamps:true});

module.exports = mongoose.model('Notification',notificationShema);
const mongoose = require("mongoose")
const commentShema = new mongoose.Schema({
    post : {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comment : {type: String, required:true},
},{timestamps:true});

module.exports = mongoose.model('Comment',commentShema);
const mongoose = require("mongoose")
const postShema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content : {type:String, required:true},
    image : {type:String,},
    tags : [{type:String}],
    mentions : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

module.exports = mongoose.model('Post',postShema);
const mongoose = require("mongoose")

const interestShema = new mongoose.Schema({
    interest : {type:String, required:true},
    hashTags : [],
});

module.exports = mongoose.model('Interest',interestShema);
const mongoose = require("mongoose")

const skillShema = new mongoose.Schema({
    skill : {type:String, required:true},
});

module.exports = mongoose.model('Skill',skillShema);
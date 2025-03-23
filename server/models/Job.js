const mongoose = require("mongoose")


const jobShema = new mongoose.Schema({
    recuiter : {type:mongoose.Schema.Types.ObjectId, ref:"User"},   
    title : {type: String, required: true},
    company : {type: String, required: true},
    location : {type:String, required:true},
    salaryRange : {type: String},
    empType : {type: String},
    description : {type: String},
    skills : [{type: String}],
    responsibilities : [{type: String}],
},{timestamps:true})


module.exports = mongoose.model('Job',jobShema);
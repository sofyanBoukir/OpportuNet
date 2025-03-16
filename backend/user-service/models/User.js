const mongoose = require("mongoose")
require("dotenv").config()
const userShema = new mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required: true, unique:true},
    password : {type:String, required:true},
    role : {type:String},
    isNewUser : {type:Boolean, default:true},
    isVerified : {type:Boolean, default:false},
    profile_picture : {type:String, default:`${process.env.SERVER_URL}/users/userDefaultImage.jpg`},
    headeLine : {type:String},
    companyName : {type:String},
    about : {type:String},
    location : {type:String},
    webSite : {type:String},
    skills : [ {type:String} ],
    interests : [{type: mongoose.Schema.Types.ObjectId, ref: "Interest"}],
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            year: { type: String },
        }
    ],
    experience: [
        {
            position: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String },
            year: { type: String },
            current: { type: Boolean, default: false },
            description: { type: String }
        }
    ]
});

module.exports = mongoose.model('User',userShema);
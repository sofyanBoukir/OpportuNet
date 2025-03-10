const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required: true, unique:true},
    password : {type:String, required:true},
    role : {type:String},
    profile_picture : {type:String, default:'http://localhost:3000/users/defaultUserImage.png'},
    headeLine : {type:String},
    companyName : {type:String},
    bio : {type:String},
    location : {type:String},
    phone : {type:String, unique:true},
    skills : [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    interests : [{type: mongoose.Schema.Types.ObjectId, ref: "Interest"}],
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            year: { type: Number },
            description: { type: String }
        }
    ],
    experience: [
        {
            position: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String },
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String }
        }
    ]
});

module.exports = mongoose.model('User',userShema);
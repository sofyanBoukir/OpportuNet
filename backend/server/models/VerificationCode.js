const mongoose = require("mongoose")

const verifycodeShema = new mongoose.Schema({
    email : {type:String, required:true},
    code : {type:String, required: true},
    expires_at: { type: Date, required: true, default: () => new Date(Date.now() + 5 * 60 * 1000) }
})

module.exports = mongoose.model('VerifyCode',verifycodeShema);
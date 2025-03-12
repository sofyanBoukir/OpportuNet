const mongoose = require("mongoose")

const tokenShema = new mongoose.Schema({
    token : {type:String, required:true},
    email : {type:String, required: true},
    expires_at: { type: Date, required: true, default: () => new Date(Date.now() + 5 * 60 * 1000) }
})

module.exports = mongoose.model('Token',tokenShema);
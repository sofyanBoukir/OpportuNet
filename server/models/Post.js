const mongoose = require("mongoose")
const postShema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content : {type:String, required:true},
    image : {type:String,},
    tags : [{type:String}],
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    mentions : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postShema.virtual("imageUrl").get(function () {
    return `${process.env.SERVER_URL}${this.image}`;
});

module.exports = mongoose.model('Post',postShema);
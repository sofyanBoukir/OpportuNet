const mongoose = require("mongoose")
const commentShema = new mongoose.Schema({
    post : {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comment : {type: String, required:true},
},{timestamps:true});

commentShema.pre("findOneAndDelete", async function (next) {
    const commentId = this.getQuery()._id;

    try {
        await mongoose.model("Post").updateMany(
            { comments: commentId }, 
            { $pull: { comments: commentId } }
        );
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Comment',commentShema);
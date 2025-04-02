const mongoose = require("mongoose");
const reportShema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, red: "Post" },
    // reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportShema);

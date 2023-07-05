const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    body: {
        type: String,
        required: true,
        max: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
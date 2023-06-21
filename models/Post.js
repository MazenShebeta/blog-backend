const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    photo: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
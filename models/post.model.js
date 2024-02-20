const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

// Middleware to handle unique key violation error
PostSchema.post("save", function (error, doc, next) {
  console.log("🚀 ~ file: userModel.js:140 ~ error:", error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    const keyPattern = Object.keys(error.keyPattern)[0];

    next(new Error(`This ${keyPattern} is already used!`));
  } else {
    next(error);
  }
});

// Middleware to handle required fields validation error
PostSchema.post('save', function (error, doc, next) {
  console.log('🚀 ~ file: userModel.js:140 ~ error:', error);
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((err) => err.message);
    next(new Error(`${errors.join(', ')}`));
  } else {
    next(error);
  }
});


module.exports = mongoose.model("Post", PostSchema);

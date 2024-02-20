const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware to handle unique key violation error
CategorySchema.post("save", function (error, doc, next) {
  console.log("🚀 ~ file: userModel.js:140 ~ error:", error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    const keyPattern = Object.keys(error.keyPattern)[0];

    next(new Error(`This ${keyPattern} is already used!`));
  } else {
    next(error);
  }
});

// Middleware to handle required fields validation error
CategorySchema.post('save', function (error, doc, next) {
  console.log('🚀 ~ file: userModel.js:140 ~ error:', error);
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((err) => err.message);
    next(new Error(`${errors.join(', ')}`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Category", CategorySchema);
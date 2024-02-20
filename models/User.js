const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true],
      trim: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    emailVerificationCode: {
      type: String,
    },
    passwordVerificationCode: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateVerificationToken = async function () {
  const verificationToken = jwt.sign(
    { _id: this._id.toString(), role: this.role },
    process.env.JWT_SECRET
  );
  return verificationToken;
};

UserSchema.methods.generatePasswordReset = async function () {
  const passwordResetToken = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET
  );
  return passwordResetToken;
};

UserSchema.methods.checkPassword = async function (password) {
  // Check if password matches
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

UserSchema.methods.generateAuthToken = async function () {
  // generate a new auth token
  const token = jwt.sign(
    { _id: this._id.toString(), role: this.role },
    process.env.JWT_SECRET
  );

  // Add the new token to the tokens array
  this.tokens.push({ token });

  // Save the updated user document to the database
  await this.save();

  return token;
};

// before saving the user, hash the password
UserSchema.pre("save", async function (next) {
  // Check if the password is modified, if not, move to next middleware
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt for the password hash
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Update the password with the hashed version
    this.password = passwordHash;
  } catch (error) {
    return next(error);
  }
});

// Middleware to handle unique key violation error
UserSchema.post("save", function (error, doc, next) {
  console.log("🚀 ~ file: userModel.js:140 ~ error:", error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    const keyPattern = Object.keys(error.keyPattern)[0];

    next(new Error(`This ${keyPattern} is already used!`));
  } else {
    next(error);
  }
});

// Middleware to handle required fields validation error
UserSchema.post("save", function (error, doc, next) {
  console.log("🚀 ~ file: userModel.js:140 ~ error:", error);
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    next(new Error(`${errors.join(", ")}`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);

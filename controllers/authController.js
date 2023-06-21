const User = require("../models/User");
const bcrypt = require("bcrypt");

class auth {
  // Register
  static async register(req, res) {
    try {
      let newUser;
      // create new user
      if (req.body.image) {
        newUser = new User({
          username: req.body.username,
          email: req.body.email,
          profilePic: req.body.image,
          password: req.body.password,
          gender: req.body.gender,
        });
      } else {
        newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
        });
      }

      if (req.body.gender == "male" && !req.body.image) {
        newUser.profilePic =
          "https://firebasestorage.googleapis.com/v0/b/art-commerce-e662f.appspot.com/o/artist_male.png?alt=media&token=6adc0394-2e67-4fc7-9a2a-c33418434e1d";
      } else if (req.body.gender == "female" && !req.body.image) {
        newUser.profilePic =
          "https://firebasestorage.googleapis.com/v0/b/art-commerce-e662f.appspot.com/o/artist_female.png?alt=media&token=be3aeef9-a7d8-4491-8f84-810803ec80dc";
      }

      // save user
      const user = await newUser.save();

      // generate token
      const token = await user.generateAuthToken();
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Login
  static async login(req, res) {
    try {
      // find user by email
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        // check password
        const isMatch = await user.checkPassword(req.body.password);

        if (isMatch) {
          // generate token
          const token = await user.generateAuthToken();
          res.status(200).json({ token });
        } else {
          // if password does not match, throw error
          throw new Error("Invalid email or password");
        }
      } else {
        // if user not found, throw error
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      // if error occurs, return error message
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = auth;

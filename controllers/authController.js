const User = require("../models/User");
const bcrypt = require("bcrypt");

class auth {
  // Register
  static async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Login
  static async login(req, res) {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (user) {
        // match passwords
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          // send user info without password
          const { password, ...others } = user._doc;
          res.status(200).json(others);
        } else {
          !validPassword && res.status(400).json("Wrong password");
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = auth;

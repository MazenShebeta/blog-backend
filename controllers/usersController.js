const User = require("../models/User");
const bcrypt = require("bcrypt");

class users {
  //  update
  static async update(req, res) {
    if (req.body.userID === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.body.userID,
          {
            $set: req.body,
          },
          { new: true }
        );
        console.log(updatedUser);
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account");
    }
  }

  // Delete
  static async delete(req, res) {
    try {
      if (req.body.userID === req.params.id) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } catch (err) {
          res.status(500).json(err.message);
        }
      } else {
        res.status(403).json("You can delete only your account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get user
  static async get(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = users;

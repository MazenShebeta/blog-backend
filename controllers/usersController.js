const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

class users {
  //  update
  static async update(req, res) {
    try{
      const updatedUser = await User.findById(req.params.id)
      if(!updatedUser){
        res.status(404).json("User not found")
      }
      if(req.user._id != req.params.id){
        res.status(403).json("You can only update your account")
      }
      updatedUser.set(req.body)
      await updatedUser.save();
      res.status(200).json({message:"updated succefully", updatedUser})
    }
    catch(error){
      res.status(400).json(error)
    }
  }

  // Delete
  static async delete(req, res) {
    try {
      console.log(req.body)
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
      const user = await User.findOne({username: req.params.username}).select("_id username email gender role profilePic createdAt");
      if(!user)
        return res.status(404).json("User not found")
      const posts = await Post.find({user: user._id})
      res.status(200).json({user, posts});
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = users;

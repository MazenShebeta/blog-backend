const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcrypt");

class users {
  //  update
  static async update(req, res) {
    try{
      const updatedUser = await User.findById(req.params.id)
      if(!updatedUser){
        res.status(404).json({message: "User not found"})
      }
      if(req.user._id != req.params.id){
        res.status(403).json({message: "You can only update your account"})
      }
      updatedUser.set(req.body)
      await updatedUser.save();
      res.status(200).json({message:"updated succefully", updatedUser})
    }
    catch(error){
      res.status(400).json({message: error.message})
    }
  }

  // Delete
  static async delete(req, res) {
    try {
      console.log(req.body)
      if (req.body.userID === req.params.id) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json({message: "Account has been deleted"});
        } catch (error) {
          res.status(500).json({message: error.message});
        }
      } else {
        res.status(403).json({message: "You can delete only your account"});
      }
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }

  // Get user
  static async get(req, res) {
    try {
      const user = await User.findOne({username: req.params.username}).select("_id username email gender role profilePic createdAt");
      if(!user)
        return res.status(404).json({message: "User not found"})
      const posts = await Post.find({user: user._id})
      res.status(200).json({user, posts});
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }
}
module.exports = users;

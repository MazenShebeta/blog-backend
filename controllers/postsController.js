const Post = require("../models/Post");
const Comment = require("../models/Comment");

class posts {
  // Create post
  static async create(req, res) {
    try {
      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        photo: req.body.image,
        user: req.user._id,
        categories: req.body.categories,
      });
      await newPost.save();
      res.status(200).json({ message: "Post created successfully", newPost });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  // Update post
  static async update(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.user !== req.user._id) {
        res.status(403).json("You can update only your post");
      }
      post.update(req.body);
      await post.save();
      res.status(200).json({ message: "Post has been updated", post });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  // Delete post
  static async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.user != req.user._id && req.user.role != "admin")
        throw new Error("Not authorized!");

      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(400).json(err);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }

  // Get post
  static async get(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("user", "username").populate("categories", "name");
      if(!post) res.status(404).json({message: "Post not found"})
      const comments = await Comment.find({ post: req.params.id });
      post.comments = comments;
      res.status(200).json({post});
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  // Get all posts
  static async getAll(req, res) {
    try {
      let query = req.query;
      const posts = await Post.find({ query });
      // if (user) {
      //   posts = await Post.find({ userId: user._id });
      // } else if (catName) {
      //   posts = await Post.find({
      // categories: { $in: [catName] }, //fix
      //   });
      // } else {
      // }
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = posts;

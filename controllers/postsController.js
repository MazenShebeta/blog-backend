const Post = require("../models/Post");

class posts {
  // Create post
  static async create(req, res) {
    try {
      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        photo: req.body.image,
        username: req.user._id,
        categories: req.body.categories,
      });
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Update post
  static async update(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.user._id) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete post
  static async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId != req.body.userId && req.user.role != "admin")
        throw new Error("Not authorized!");

      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get post
  static async get(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get all posts
  static async getAll(req, res) {
    const user = req.user;
    const catName = req.query.cat;
    try {
      let posts;
      // if (user) {
      //   posts = await Post.find({ userId: user._id });
      // } else if (catName) {
      //   posts = await Post.find({
          // categories: { $in: [catName] }, //fix
      //   });
      // } else {
        posts = await Post.find(catName ? { categories: catName } : {});
      // }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = posts;

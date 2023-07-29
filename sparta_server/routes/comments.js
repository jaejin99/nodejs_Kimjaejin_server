const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Post = require("../schemas/post.js");

router.get("/comments", async (req, res) => {
  const comments = await Comment.find({});
  const postIds = comments.map((comment) => comment.postId);

  const post = await Post.find({ postId: postIds });

  const results = comments.map((comment) => {
    return {
      post: post.find((item) => item.postId === comment.postId)
    };
  });

  res.json({
    comments: results,
  });
});


module.exports = router;
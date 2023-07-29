const express = require('express');
const router = express.Router();
const posts = [
    {
    "postId": "62d6d12cd88cadd496a9e54e",      
    "user": "Developer",      
    "title": "안녕하세요",      
    "createdAt": "2022-07-19T15:43:40.266Z"
    },
    {
    "postId": "62d6cc66e28b7aff02e82954",      
    "user": "Developer",      
    "title": "안녕하세요",      
    "createdAt": "2022-07-19T15:23:18.433Z"
    }
]

router.get("/posts", (req, res) => {
	res.json({ posts: posts });
});

router.get("/posts/:postId", (req, res) => {
	const { postId } = req.params;
	const [detail] = posts.filter((posts) => posts.postId === String(postId));
	res.json({ detail });
});

router.put("/posts/:_postId", async (req, res) => {
  const { postId } = req.params;
  const existsPosts = await Post.find({ postId: String(postId) });
  if (existsPosts.length) {
    await Post.updateOne({ postId: String(postId) } );
  }

router.delete("/posts/:_postId", async (req, res) => {
  const { postId } = req.params;
  const existsPosts = await Post.find({ postId });
  if (existsPosts.length > 0) {
    await Post.deleteOne({ postId });
  }
  
  res.json({ result: "success" });
});
  
  res.json({ success: true });
})

const Post = require("../schemas/post");
router.post("/post", async (req, res) => {
	const { postId, user, title, createdAt } = req.body;

  const post = await Post.find({ postId });
  if (post.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdPost = await Post.create({ postId, user, title, createdAt });

  res.json({ post: createdPost });
});

const Comment = require("../schemas/comment");
router.post("/posts/:_postId/comments", async (req, res) => {
  const { postId } = req.params;

  const existsComments = await Comment.find({ postId: String(postId) });
  if (existsComments.length) {
    return res.json({ success: false, errorMessage: "이미 게시글에 존재하는 댓글입니다." });
  }

  await Comment.create({ postId: String(postId) });

  res.json({ result: "success" });
});

router.put("/posts/:_postId/comments/:_commentId", async (req, res) => {
  const { postId } = req.params;

  const existsComments = await Comment.find({ postId: String(postId) });
  if (existsComments.length) {
    await Comment.updateOne({ postId: String(postId) } );
  }

  res.json({ success: true });
})

router.delete("/posts/:_postId/comments/:_commentId", async (req, res) => {
  const { postId } = req.params;

  const existsComments = await Comment.find({ postId });
  if (existsComments.length > 0) {
    await Comment.deleteOne({ postId });
  }

  res.json({ result: "success" });
});

  module.exports = router;
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  createdAt: {
    type: String
  }
});

module.exports = mongoose.model("Post", postSchema);
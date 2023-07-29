const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
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

module.exports = mongoose.model("comment", commentSchema);
const mongoose = require("mongoose");
const comments = require("./comments.model.js");

const Forum = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    user: {type: String, required: true},
    date: { type: Date, required: true },
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    score: { type: Number, required: true }, 
    tags: { type: String },
    comments: [comments.schema],
  },
  { collection: "forum" }
);

const model = mongoose.model("Forum", Forum);
module.exports = model;

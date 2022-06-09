const mongoose = require("mongoose");

const Forum = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    tags: { type: String },
    body: { type: Object },
    image: { type: Buffer },
    likes: { type: Number },
    dislikes: { type: Number },
    score: { type: Number },
    comments: { type: Array },
  },
  { collection: "forum" }
);

const model = mongoose.model("forum", Forum);
module.exports = model;

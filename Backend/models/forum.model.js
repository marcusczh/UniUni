const mongoose = require("mongoose");
const comments = require("./comments.model.js");

const Forum = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    body: { type: Object, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    score: { type: Number },
    tags: { type: String },
    image: { type: Buffer },
    comments: [comments.schema],
  },
  { collection: "forum" }
);


const model = mongoose.model("forum", Forum);
module.exports = model;

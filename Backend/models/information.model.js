const mongoose = require("mongoose");
const Section = require("./section.model.js");
const comments = require("./comments.model.js");

const Information = new mongoose.Schema(
  {
    author: { type: String, required: true, default: "Anonymous" },
    type: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    tags: { type: Array },
    body: [Section.schema],
    likes: { type: [String] },
    dislikes: { type: [String] },
    score: { type: Number },
    image: { type: String },
    comments: [comments.schema],
    views: { type: Number },
  },
  { collection: "information" }
);

const model = mongoose.model("information", Information);
module.exports = model;

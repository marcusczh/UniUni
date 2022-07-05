const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {
    body: { type: String, required: true },
    date: { type: Date, required: true },
    author: { type: String, required: true },
    likes: { type: [String] },
    dislikes: { type: [String] },
    score: { type: Number, required: true },
  },
  { collection: "comments" }
);

const model = mongoose.model("comments", Comments);
module.exports = model;

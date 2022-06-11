const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {
    body: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: String, required: true },
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    score: { type: Number, required: true }
  },
  { collection: "comments" }
);

const model = mongoose.model("comments", Comments);
module.exports = model;

const mongoose = require("mongoose");

const Section = new mongoose.Schema(
  {
    header: { type: String, required: true }, // "1. What do you think about this course?"
    text: { type: String, required: true }, // "abcdefg"
  },
  { collection: "section" }
);

const model = mongoose.model("Section", Section);
module.exports = model;

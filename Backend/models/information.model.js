const mongoose = require("mongoose");
const Section = require("./section.model.js");

const Information = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    tags: { type: String },
    body: [Section.schema],
  },
  { collection: "information" }
);

const model = mongoose.model("Information", Information);
module.exports = model;

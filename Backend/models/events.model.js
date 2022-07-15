const mongoose = require("mongoose");
const comments = require("./comments.model.js");

const Events = new mongoose.Schema(
  {
    author: { type: String, required: true },
    authorTele: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    time: { type: String, requirde: true },
    location: { type: String, required: true },
    body: { type: Object, required: true },
    tags: { type: [String] },
    image: { type: String },
    participants: { type: [String] },
    participantsTele: { type: [String] },
    comments: [comments.schema],
  },
  { collection: "events" }
);

const model = mongoose.model("events", Events);
module.exports = model;

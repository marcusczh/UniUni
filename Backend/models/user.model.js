const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, required: true },
    bio: { type: String },
    currentStatus: { type: String },
    pastStatus: { type: [String] },
    interests: { type: [String] },
    //bookmarks - An array of strings that keeps track of the titles of bookmarked posts
    bookmarks: { type: [String] },
    events: { type: [String] },
    teleHandle: { type: String, required: true, unique: true },
    profilePicture: { type: String },
  },
  { collection: "user-data" }
);

const model = mongoose.model("user-data", User);
module.exports = model;

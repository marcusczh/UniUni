const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, required: true},
    bio: { type: String },
    status: {type: [String]},
    interests: {type: [String]}
  },
  { collection: "user-data" }
);

const model = mongoose.model("user-data", User);
module.exports = model;

const express = require("express");
const User = require("./models/user.model");
const Information = require("./models/information.model");
const router = express.Router();
const Forum = require("./models/forum.model");

//Logging in: Posting a username & password
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username, password: password });
  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Registering an account: Posting
router.post("/register", async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      background: req.body.background,
      interests: req.body.interests,
      others: req.body.others,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Duplicate account" });
  }
});

//Fetching information (Articles/Interviews/Guides)
router.get("/information", async (req, res) => {
  console.log(req.query);
  await Information.find(req.query)
    .sort({ views: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

//Fetching Forum
router.get("/forum", async (req, res) => {
  console.log(req.query);
  await Forum.find(req.query)
    .sort({ score : -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

module.exports = router;

//Creating an article: Posting
router.post("/create", async (req, res) => {
  try {
    await Information.create({
        type: req.body.type,
        title: req.body.title,
        date: req.body.date,
        tags: req.body.tags,
        body: req.body.body,
        views: req.body.views
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Creating a comment: Posting
router.post("/createcomment/:title", async (req, res) => {
  try {
    await Forum.collection.findOneAndUpdate({
      title: req.params.title}, 
      {$push:{comments: {
        body: req.body.body,
        date: req.body.date,
        user: req.body.user,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        score: req.body.score}}})
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});
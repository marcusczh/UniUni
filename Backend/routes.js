const express = require("express");
const User = require("./models/user.model");
const Information = require("./models/information.model");
const router = express.Router();

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
  await Information.find({
    $search: {
      wildcard: {
        type: req.query.type,
        title: req.query.title,
        date: req.query.date,
        tags: req.query.tags,
        body: req.query.body,
      },
    },
  })
    .sort({ views: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

module.exports = router;

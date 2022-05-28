const express = require("express");
const User = require("./models/user.model");
const router = express.Router();

//Setting up Database: Sending Requests
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username, password: password });
  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.post("/register", async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Duplicate account" });
  }
});

module.exports = router;

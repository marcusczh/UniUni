const express = require("express");
const User = require("./models/user.model");
const Information = require("./models/information.model");
const Forum = require("./models/forum.model");
const router = express.Router();

//REGISTRATION & LOGIN
//Logging in: Posting a username & password
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username, password: password });
  if (user) {
    return res.json({ status: "ok", user: user });
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

//ARTICLES, GUIDES, INTERVIEWS
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

//Creating an article: Posting
router.post("/create", async (req, res) => {
  try {
    await Information.create({
      type: req.body.type,
      title: req.body.title,
      date: req.body.date,
      tags: req.body.tags,
      body: req.body.body,
      views: req.body.views,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Searching for an article/interview/guide
//Checks (1): Are there tags selected? Yes: continue. No: return a search for all
//Checks (2): Is there text provided? Yes: search for text and tags. No: return search for all

router.get("/search", async (req, res) => {
  try {
    console.log(req.query.title);
    if (req.query.title.length !== 0) {
      if (req.query.types.length === 0) {
        await Information.aggregate([
          {
            $search: {
              index: "default",
              compound: {
                filter: [
                  {
                    text: {
                      query: req.query.title,
                      path: "title",
                      fuzzy: {
                        maxEdits: 2,
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            $limit: 20,
          },
          {
            $project: {
              type: 1,
              title: 1,
              date: 1,
              tags: 1,
              body: 1,
              view: 1,
              score: {
                $meta: "searchScore",
              },
            },
          },
        ]).then((data) => {
          res.json(data);
        });
      } else {
        await Information.aggregate([
          {
            $search: {
              index: "default",
              compound: {
                filter: [
                  {
                    text: {
                      query: req.query.title,
                      path: "title",
                      fuzzy: {
                        maxEdits: 2,
                      },
                    },
                  },
                  {
                    text: {
                      query: req.query.types,
                      path: "type",
                    },
                  },
                ],
              },
            },
          },
        ]).then((data) => {
          res.json(data);
        });
      }
    } else {
      if (req.query.types.length === 0) {
        await Information.find({})
          .limit(20)
          .then((data) => {
            res.json(data);
          });
      } else {
        await Information.aggregate([
          {
            $search: {
              index: "default",
              compound: {
                filter: [
                  {
                    text: {
                      query: req.query.types,
                      path: "type",
                    },
                  },
                ],
              },
            },
          },
          {
            $limit: 20,
          },
          {
            $project: {
              type: 1,
              title: 1,
              date: 1,
              tags: 1,
              body: 1,
              view: 1,
              score: {
                $meta: "searchScore",
              },
            },
          },
        ]).then((data) => {
          res.json(data);
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//FORUM
//Fetching Forum Posts
router.get("/forum", async (req, res) => {
  await Forum.find(req.query)
    .sort({ score: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: "error",
        error: "Could not retrieve Forum Posts",
      });
    });
});

//Searching for a forum

router.get("/searchForum", async (req, res) => {
  try {
    console.log(req.query.title);
    if (req.query.title.length !== 0) {
      await Forum.aggregate([
        {
          $search: {
            index: "default",
            compound: {
              filter: [
                {
                  text: {
                    query: req.query.title,
                    path: "title",
                    fuzzy: {
                      maxEdits: 2,
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $limit: 20,
        },
        {
          $project: {
            type: "Forum",
            user: 1,
            title: 1,
            date: 1,
            tags: 1,
            body: 1,
            view: 1,
            comments: 1,
            score: {
              $meta: "searchScore",
            },
          },
        },
      ]).then((data) => {
        res.json(data);
      });
    } else {
      await Forum.find({})
        .sort({ score: -1 })
        .then((data) => {
          res.json(data);
        });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      error: "Could not retrieve Forum Posts",
    });
  }
});

//Deleting forum posts
router.delete("/forum/:title/:_id", async (req, res) => {
  try {
    const result = await Forum.findOneAndDelete({
      title: req.params.title,
      _id: req.params._id,
    });
    if (!result) {
      res.json({
        status: "error",
        error: "Could not delete post",
      });
    } else {
      console.log("Post deleted");
      res.json({
        status: "ok",
      });
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;

//Creating a comment: Posting
router.post("/createcomment/:title", async (req, res) => {
  try {
    await Forum.collection.findOneAndUpdate(
      {
        title: req.params.title,
      },
      {
        $push: {
          comments: {
            body: req.body.body,
            date: req.body.date,
            user: req.body.user,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            score: req.body.score,
          },
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Liking/Disliking a post: Posting
router.post("/like/:title", async (req, res) => {
  try {
    await Forum.collection.findOneAndUpdate(
      {
        title: req.params.title,
      },
      {
        $inc: {
          likes: req.body.likes,
          dislikes: req.body.dislikes,
          score: req.body.likes - req.body.dislikes,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Liking/Disliking a comment: Posting
//TODO: add in user filter
router.post("/likecomment/:title/:body/:user/:index", async (req, res) => {
  try {
    Forum.collection.updateOne(
      {
        title: req.params.title,
        "comments.body": req.params.body,
      },
      {
        $inc: {
          "comments.$.likes": req.body.likes,
          "comments.$.dislikes": req.body.dislikes,
          "comments.$.score": req.body.likes - req.body.dislikes,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Creating a forum post: Posting
router.post("/createforum", async (req, res) => {
  var image = req.body.image;
  var encode = image.toString("base64");
  var final = {
    contentType: String,
    image: Buffer.from(encode, "base64"),
  };
  try {
    await Forum.create({
      user: req.body.user,
      title: req.body.title,
      date: req.body.date,
      body: req.body.body,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      score: req.body.score,
      tags: req.body.tags,
      comments: req.body.comments,
      image: encode,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

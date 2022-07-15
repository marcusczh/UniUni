const express = require("express");
const User = require("./models/user.model");
const Information = require("./models/information.model");
const Events = require("./models/events.model");
// const Forum = require("./models/forum.model");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  secure: true,
});

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
  let imageLink;
  if (req.body.profilePicture !== "") {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    try {
      const result = await cloudinary.uploader.upload(
        req.body.profilePicture,
        options
      );
      imageLink = result.url;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    console.log(imageLink);
    await User.create({
      username: req.body.username,
      password: req.body.password,
      score: 0,
      bio: req.body.bio,
      currentStatus: req.body.currentStatus,
      pastStatus: req.body.pastStatus,
      interests: req.body.interests,
      bookmarks: [],
      profilePicture: imageLink ? imageLink : "",
      teleHandle: req.body.teleHandle,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Duplicate account" });
  }
});

// Fetch profile information
router.get("/profile", async (req, res) => {
  //console.log(req.query);
  await User.findOne(req.query)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

// Edit profile information
router.post("/editprofile", async (req, res) => {
  //console.log(req.query);
  await User.findOneAndUpdate(req.query, {
    $set: {
      bio: req.body.bio,
      currentStatus: req.body.currentStatus,
      pastStatus: req.body.pastStatus,
      interests: req.body.interests,
      teleHandle: req.body.teleHandle,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

//ARTICLES, GUIDES, INTERVIEWS, FORUM
//Fetching information (Articles/Interviews/Guides/Forum)
router.get("/information", async (req, res) => {
  //console.log(req.query);
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

router.post("/information", async (req, res) => {
  //console.log(req.body);
  await Information.find(req.body)
    .sort({ views: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

//Updating view count
router.post("/informationviews", async (req, res) => {
  //console.log(req.body.params);
  try {
    await Information.findOneAndUpdate(
      { type: req.body.params.type, title: req.body.params.title },
      {
        $inc: {
          views: 1,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Creating an article: Posting
router.post("/create", async (req, res) => {
  let imageLink;
  if (req.body.image !== "") {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    try {
      const result = await cloudinary.uploader.upload(req.body.image, options);
      imageLink = result.url;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    await Information.create({
      author: req.body.author,
      type: req.body.type,
      title: req.body.title,
      date: req.body.date,
      tags: req.body.tags,
      body: req.body.body,
      views: req.body.views,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      score: req.body.score,
      image: imageLink,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

// //Searching for an article/interview/guide
// //Checks (1): Are there tags selected? Yes: continue. No: return a search for all
// //Checks (2): Is there text provided? Yes: search for text and tags. No: return search for all

// router.get("/search", async (req, res) => {
//   try {
//     console.log(req.query.title);
//     if (req.query.title.length !== 0) {
//       if (req.query.types.length === 0) {
//         await Information.aggregate([
//           {
//             $search: {
//               index: "default",
//               compound: {
//                 filter: [
//                   {
//                     text: {
//                       query: req.query.title,
//                       path: "title",
//                       fuzzy: {
//                         maxEdits: 2,
//                       },
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             $limit: 20,
//           },
//           {
//             $project: {
//               type: 1,
//               title: 1,
//               date: 1,
//               tags: 1,
//               body: 1,
//               view: 1,
//               score: {
//                 $meta: "searchScore",
//               },
//             },
//           },
//         ]).then((data) => {
//           res.json(data);
//         });
//       } else {
//         await Information.aggregate([
//           {
//             $search: {
//               index: "default",
//               compound: {
//                 filter: [
//                   {
//                     text: {
//                       query: req.query.title,
//                       path: "title",
//                       fuzzy: {
//                         maxEdits: 2,
//                       },
//                     },
//                   },
//                   {
//                     text: {
//                       query: req.query.types,
//                       path: "type",
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//         ]).then((data) => {
//           res.json(data);
//         });
//       }
//     } else {
//       if (req.query.types.length === 0) {
//         await Information.find({})
//           .limit(20)
//           .then((data) => {
//             res.json(data);
//           });
//       } else {
//         await Information.aggregate([
//           {
//             $search: {
//               index: "default",
//               compound: {
//                 filter: [
//                   {
//                     text: {
//                       query: req.query.types,
//                       path: "type",
//                     },
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             $limit: 20,
//           },
//           {
//             $project: {
//               type: 1,
//               title: 1,
//               date: 1,
//               tags: 1,
//               body: 1,
//               view: 1,
//               score: {
//                 $meta: "searchScore",
//               },
//             },
//           },
//         ]).then((data) => {
//           res.json(data);
//         });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: "error", error: "Something bad happened." });
//   }
// });

//2nd version of search query
router.get("/search", async (req, res) => {
  try {
    let filterArray = [];
    console.log(req.query.title);
    let titleObj = {};
    let tagsObj = {};
    let filtersObj = {};
    const allTitles = req.query.title ? false : req.query.title.length === 0;
    const allTags = req.query.tags ? false : req.query.tags.length === 0;
    const allFilters = req.query.types ? false : req.query.types.length === 0;
    if (!allTitles) {
      titleObj = {
        text: {
          query: req.query.title,
          path: "title",
          fuzzy: {
            maxEdits: 2,
          },
        },
      };
      filterArray.push(titleObj);
    }

    if (!allTags) {
      tagsObj = {
        text: {
          query: req.query.tags,
          path: "tags",
        },
      };
      filterArray.push(tagsObj);
    }

    if (!allFilters) {
      filtersObj = {
        text: {
          query: req.query.types,
          path: "type",
        },
      };
      filterArray.push(filtersObj);
    }

    console.log(filterArray);

    if (allTitles && allFilters && allTags) {
      await Information.find().then((data) => {
        res.json(data);
      });
    } else {
      await Information.aggregate([
        {
          $search: {
            index: "default",
            compound: {
              filter: filterArray,
            },
          },
        },
        {
          $limit: 400,
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
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//FORUM
//Fetching Forum Posts
/* router.get("/forum", async (req, res) => {
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
}); */

//Searching for a forum

// router.get("/searchForum", async (req, res) => {
//   try {
//     console.log(req.query.title);
//     if (req.query.title.length !== 0) {
//       await Forum.aggregate([
//         {
//           $search: {
//             index: "default",
//             compound: {
//               filter: [
//                 {
//                   text: {
//                     query: req.query.title,
//                     path: "title",
//                     fuzzy: {
//                       maxEdits: 2,
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         },
//         {
//           $limit: 20,
//         },
//         {
//           $project: {
//             type: "Forum",
//             user: 1,
//             title: 1,
//             date: 1,
//             tags: 1,
//             body: 1,
//             view: 1,
//             comments: 1,
//             score: {
//               $meta: "searchScore",
//             },
//           },
//         },
//       ]).then((data) => {
//         res.json(data);
//       });
//     } else {
//       await Forum.find({})
//         .sort({ score: -1 })
//         .then((data) => {
//           res.json(data);
//         });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({
//       status: "error",
//       error: "Could not retrieve Forum Posts",
//     });
//   }
// });

//Deleting forum posts
router.delete("/information/:title/:_id/:user", async (req, res) => {
  try {
    await Information.collection
      .findOne({
        type: "Forum",
        title: req.params.title,
      })
      .then((post) =>
        User.collection.findOneAndUpdate(
          {
            username: req.params.user,
          },
          {
            $inc: {
              score: -post.score,
            },
          }
        )
      );
    const result = await Information.findOneAndDelete({
      type: "Forum",
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

//Creating a forum comment: Posting
router.post("/createcomment/:title", async (req, res) => {
  try {
    await Information.collection.findOneAndUpdate(
      {
        type: "Forum",
        title: req.params.title,
      },
      {
        $push: {
          comments: {
            body: req.body.body,
            date: req.body.date,
            author: req.body.author,
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

//Liking a POST: Post req
router.post("/like/:title/:user", async (req, res) => {
  //console.log(req.params.user);
  try {
    Information.collection.findOneAndUpdate(
      {
        title: req.params.title,
        type: "Forum",
      },
      {
        $inc: {
          score: 1,
        },
        $push: {
          likes: req.body.user,
        },
      }
    );
    User.collection.findOneAndUpdate(
      {
        username: req.params.user,
      },
      {
        $inc: {
          score: 1,
        },
      }
    );
    //User.collection.findOne({username: "UserScore"}).then((x) => console.log(x))
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Disliking a POST: Post req
router.post("/dislike/:title/:user", async (req, res) => {
  //console.log(req.params.user);
  try {
    Information.collection.findOneAndUpdate(
      {
        title: req.params.title,
        type: "Forum",
      },
      {
        $inc: {
          score: -1,
        },
        $push: {
          dislikes: req.body.user,
        },
      }
    );
    User.collection.findOneAndUpdate(
      {
        username: req.params.user,
      },
      {
        $inc: {
          score: -1,
        },
      }
    );
    //User.collection.findOne({username: "UserScore"}).then((x) => console.log(x))
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Un-Liking a POST: Post req
router.post("/un-like/:title/:user", async (req, res) => {
  //console.log(req.params.user);
  try {
    Information.collection.findOneAndUpdate(
      {
        title: req.params.title,
        type: "Forum",
      },
      {
        $inc: {
          score: -1,
        },
        $pull: {
          likes: req.body.user,
        },
      }
    );
    User.collection.findOneAndUpdate(
      {
        username: req.params.user,
      },
      {
        $inc: {
          score: -1,
        },
      }
    );
    //User.collection.findOne({username: "UserScore"}).then((x) => console.log(x))
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Un-Disliking a POST: Post req
router.post("/un-dislike/:title/:user", async (req, res) => {
  //console.log(req.params.user);
  try {
    Information.collection.findOneAndUpdate(
      {
        title: req.params.title,
        type: "Forum",
      },
      {
        $inc: {
          score: 1,
        },
        $pull: {
          dislikes: req.body.user,
        },
      }
    );
    User.collection.findOneAndUpdate(
      {
        username: req.params.user,
      },
      {
        $inc: {
          score: 1,
        },
      }
    );
    //User.collection.findOne({username: "UserScore"}).then((x) => console.log(x))
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Liking a COMMENT: Post req
router.post("/likecomment/:title/:body/:user/:index", async (req, res) => {
  try {
    Information.collection.updateOne(
      {
        title: req.params.title,
        "comments.body": req.params.body,
        "comments.author": req.params.user,
      },
      {
        $inc: {
          "comments.$.score": 1,
        },
        $push: {
          "comments.$.likes": req.body.user,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Disliking a COMMENT: Post req
router.post("/dislikecomment/:title/:body/:user/:index", async (req, res) => {
  try {
    Information.collection.updateOne(
      {
        title: req.params.title,
        "comments.body": req.params.body,
        "comments.author": req.params.user,
      },
      {
        $inc: {
          "comments.$.score": -1,
        },
        $push: {
          "comments.$.dislikes": req.body.user,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Un-Liking a COMMENT: Post req
router.post("/un-likecomment/:title/:body/:user/:index", async (req, res) => {
  try {
    Information.collection.updateOne(
      {
        title: req.params.title,
        "comments.body": req.params.body,
        "comments.author": req.params.user,
      },
      {
        $inc: {
          "comments.$.score": -1,
        },
        $pull: {
          "comments.$.likes": req.body.user,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Un-Disliking a COMMENT: Post req
router.post(
  "/un-dislikecomment/:title/:body/:user/:index",
  async (req, res) => {
    try {
      Information.collection.updateOne(
        {
          title: req.params.title,
          "comments.body": req.params.body,
          "comments.author": req.params.user,
        },
        {
          $inc: {
            "comments.$.score": 1,
          },
          $pull: {
            "comments.$.dislikes": req.body.user,
          },
        }
      );
      return res.json({ status: "ok" });
    } catch (err) {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    }
  }
);

//Uploading an image for forum creation
// router.post("/uploadimage", async (req, res) => {
//   var image = req.body.image;
//   var encode = image.toString("base64");
//   var final = {
//     contentType: String,
//     image: Buffer.from(encode, "base64"),
//   };
//   try {
//     await Forum.create({
//       user: req.body.user,
//       title: req.body.title,
//       date: req.body.date,
//       body: req.body.body,
//       likes: req.body.likes,
//       dislikes: req.body.dislikes,
//       score: req.body.score,
//       tags: req.body.tags,
//       comments: req.body.comments,
//       image: encode,
//     });
//     return res.json({ status: "ok" });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: "error", error: "Something bad happened." });
//   }
// });

//Creating a forum post: Posting
/* router.post("/createforum", async (req, res) => {
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
}); */

//Implementing bookmarks
//Fetching user
router.get("/fetchUser", async (req, res) => {
  console.log(req.query);
  const { username } = req.query;

  const user = await User.findOne({ username: username });
  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//Adding user bookmarks
router.put("/bookmark", async (req, res) => {
  try {
    User.collection.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $push: {
          bookmarks: req.body.title,
        },
      }
    );
    console.log("added bookmark");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Deleting user bookmarks
router.delete("/bookmark", async (req, res) => {
  try {
    User.collection.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $pull: {
          bookmarks: req.body.title,
        },
      }
    );
    console.log(req.body);
    console.log("deleted bookmark");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Adding user event bookmarks
router.put("/events/bookmark", async (req, res) => {
  try {
    User.collection.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $push: {
          events: req.body.title,
        },
      }
    );
    console.log("added bookmark");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Deleting user bookmarks
router.delete("/events/bookmark", async (req, res) => {
  try {
    User.collection.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $pull: {
          events: req.body.title,
        },
      }
    );
    console.log(req.body);
    console.log("deleted bookmark");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

//Coordinator API
router.get("/events", async (req, res) => {
  await Events.find(req.query)
    .sort({ date: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

router.post("/events/create", async (req, res) => {
  await Events.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: "error", error: "Something bad happened." });
    });
});

router.put("/events/join", async (req, res) => {
  try {
    Events.collection.findOneAndUpdate(
      {
        title: req.body.title,
      },
      {
        $push: {
          participants: req.body.username,
          participantsTele: req.body.telegramHandle,
        },
      }
    );
    console.log("Joined event");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

router.delete("/events/leave", async (req, res) => {
  try {
    console.log(req.body);
    Events.collection.findOneAndUpdate(
      {
        title: req.body.title,
      },
      {
        $pull: {
          participants: req.body.username,
          participantsTele: req.body.telegramHandle,
        },
      }
    );
    console.log("Left event");
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: "Something bad happened." });
  }
});

// Delete events
router.delete("/events/:title/:_id/:user", async (req, res) => {
  try {
    const result = await Events.findOneAndDelete({
      title: req.params.title,
      _id: req.params._id,
      user: req.params.user,
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

//Creating an event comment: Posting
router.post("/events/createcomment/:title", async (req, res) => {
  try {
    await Events.collection.findOneAndUpdate(
      {
        title: req.params.title,
      },
      {
        $push: {
          comments: {
            body: req.body.body,
            date: req.body.date,
            author: req.body.author,
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

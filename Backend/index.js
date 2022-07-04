const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeUrls = require("./routes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//Setting up Database
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

//Telling index.js to redirect all POST to /api + (each url of routeUrls)
app.use("/api", routeUrls);
app.listen(process.env.PORT || 4000, () => {
  console.log("Server started");
});

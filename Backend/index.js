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


//Telegram Bot

/* const { Telegraf, Scenes, session } = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAMBOT_TOKEN);
const axios = require("axios");

console.log("Bot Started");

const eventIdWizard = new Scenes.WizardScene(
  "GET_EVENT_ID",
  (ctx) => {
    ctx.reply("What is the event title?");
    return ctx.wizard.next();
  },
  (ctx) => {
    axios
      .get("https://uni-uni-app.herokuapp.com/api/events", {
        params: {
          title: ctx.message.text,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let telegramHandle
          if (res.data[0].authorTele[0] == "@") {
            telegramHandle = res.data[0].authorTele.slice(1,)
          } else {
            telegramHandle = res.data[0].authorTele
          }
          if (telegramHandle == ctx.from.username) {
            ctx.session.details = `These are the details for your event⏰:\nDate: ${res.data[0].date.slice(
              0,
              10
            )}\nTime: ${res.data[0].time}\nLocation: ${
              res.data[0].location
            }\nDetails: ${res.data[0].body[0].text}`;
            ctx.session.handles = `These are the participants for your event👫:\n${res.data[0].participantsTele
              .map((elem) => {
                if (elem[0] == "@") {
                  return `${elem}`;
                } else {
                  return `@${elem}`;
                }
              })
              .join("\n")}`;
            ctx.reply(`${ctx.session.handles}\n\n${ctx.session.details}`);
          } else {
            ctx.reply("You are not the host for this event");
          }
        } else {
          ctx.reply("Event not found");
          return;
        }
      });
    return ctx.scene.leave();
  }
);
const stage = new Scenes.Stage([eventIdWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.command("start", (ctx) => {
  ctx.reply(
    `Hello ${ctx.from.first_name}! Welcome to the UniUni Coordinator Bot. 😊`
  );
  ctx.scene.enter("GET_EVENT_ID");
});

bot.command("help", (ctx) => {
  ctx.reply(`Commands:
  /start Displays welcome message
  /handles Lists participants of the event
  /details Lists details of the event`);
});

bot.command("handles", (ctx) => {
  if (ctx.session.handles) {
    ctx.reply(ctx.session.handles);
  } else {
    ctx.reply("No event found, use /start to begin");
  }
});

bot.command("details", (ctx) => {
  if (ctx.session.details) {
    ctx.reply(ctx.session.details);
  } else {
    ctx.reply("No event found, use /start to begin");
  }
});

bot.launch();
 */
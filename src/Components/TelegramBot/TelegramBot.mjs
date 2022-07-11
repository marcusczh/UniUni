// Telegram Bot
import { Telegraf, Scenes, session } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
const bot = new Telegraf(process.env.TELEGRAMBOT_TOKEN);
import axios from "axios";

console.log("Bot Started");

const eventIdWizard = new Scenes.WizardScene(
  "GET_EVENT_ID",
  (ctx) => {
    ctx.reply("What is the event title?");
    return ctx.wizard.next();
  },
  (ctx) => {
    axios
      .get("http://localhost:4000/api/events", {
        params: {
          title: ctx.message.text,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          //console.log(ctx.from.username);
          if (res.data[0].author == "Test") {
            //TODO: change to use tele handle
            ctx.session.details = `These are the details for your event:\nDate: ${res.data[0].date.slice(
              0,
              10
            )}\nTime: ${res.data[0].time}\nLocation: ${
              res.data[0].location
            }\nDetails: ${res.data[0].body[0].text}`;
            ctx.session.handles = `These are the participants for your event:\n${res.data[0].participants
              .map((elem) => {
                return `@${elem}`;
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
    `Hello ${ctx.from.first_name}! Welcome to the UniUni Coordinator Bot.`
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

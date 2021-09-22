const { Client, Intents } = require("discord.js");

const intents = new Intents(32767); // passed all the intents to the bot

const client = new Client({ intents }); // configured client with intents as options

require("dotenv").config();

client.on("ready", () => {
  console.log(`connected as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.content == `${process.env.PREFIX}ping`) {
    msg.reply("pong");
  }
});

client.login(process.env.TOKEN);

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

require("dotenv").config();

client.on("ready", () => {
  console.log(`connected as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.content == "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.TOKEN);

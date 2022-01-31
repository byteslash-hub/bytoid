const fs = require("fs");
const mongoose = require("mongoose")
require("dotenv").config();

const PREFIX = process.env.PREFIX;
const MONGODB_URL = process.env.MONGODB_URL

const Client = require("./structures/Client");
const Command = require("./structures/Command");

const client = new Client();
client.queue = new Map();
client.pauseTime = "";

const commandDirectory = "./src/commands"

fs.readdirSync(commandDirectory)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded!`);
    client.commands.set(command.name, command);
  });

client.on("ready", () => {
  console.log(`Connected as ${client.user.tag}`);
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB')
  }).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
  })
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;
  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);

  if (args[0] == "") return;

  const command = client.commands.find(
    (cmd) =>
      cmd.name == args[0] ||
      cmd.aliases.includes(`$args[0]}`) ||
      cmd.name == ` ${args[0]}` ||
      cmd.aliases.includes(` ${args[0]}`)
  );

  if (!command) {
    msg.reply("Not a valid command!");
    return;
  }
  else {
    command.run(msg, args, client);
  }
});

client.login(process.env.TOKEN);

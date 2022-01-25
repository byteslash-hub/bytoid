require("dotenv").config();
const PREFIX = process.env.PREFIX;

const Client = require("./structures/Client");
const fs = require("fs");
const Command = require("./structures/Command");

const client = new Client();
client.queue = new Map();
client.pauseTime = "";

fs.readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);
    console.log(`✅ Command ${command.name} Loaded!`);
    client.commands.set(command.name, command);
  });

client.on("ready", () => {
  console.log(`👋 Connected as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;
  const args = msg.content.substring(process.env.PREFIX.length).split(/ +/);

  if (args[0] == "") return;

  const command = client.commands.find(
    (cmd) =>
      cmd.name == args[0] ||
      cmd.aliases.includes(args[0]) ||
      cmd.name == ` ${args[0]}` ||
      cmd.aliases.includes(` ${args[0]}`)
  );

  if (!command) {
    msg.reply("Not a valid command!");
    return;
  }

  command.run(msg, args, client);
});

client.login(process.env.TOKEN);

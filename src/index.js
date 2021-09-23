require("dotenv").config();
const PREFIX = process.env.PREFIX;

const Client = require("./structures/Client");
const fs = require("fs");
const Command = require("./structures/Command");

const client = new Client();

fs.readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);
    console.log(`command ${command.name} loaded!`);
    client.commands.set(command.name, command);
  });

client.on("ready", () => {
  console.log(`connected as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;
  const args = msg.content.substring(process.env.PREFIX.length).split(/ +/);

  if (args[0] == "") return;

  const command = client.commands.find((cmd) => cmd.name == args[0]);

  if (!command) {
    msg.reply("Not a valid command!");
  }

  command.run(msg, args, client);
});

client.login(process.env.TOKEN);

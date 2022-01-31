const fs = require("fs");
require("dotenv").config();

const Client = require("./structures/Client");
const Command = require("./structures/Command");
const commandDirectory = "./src/commands";
const eventDirectory = "./src/events";

const client = new Client();
client.queue = new Map();
client.pauseTime = "";

// -------- COMMAND HANDLER--------------
fs.readdirSync(commandDirectory)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    /**
     * @type {Command}
     */
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded!`);
    client.commands.set(command.name, command);
    command.aliases.forEach((alias) => {
      client.aliases.set(alias, command.name);
    });
  });

//----------- EVENT HANDLER -------------
fs.readdirSync(eventDirectory)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.run(...args));
  });

//------------ BOT LOGIN ---------------
client.login(process.env.TOKEN);

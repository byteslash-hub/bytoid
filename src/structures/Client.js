const { Intents, Collection } = require("discord.js");
const Discord = require("discord.js");
const Command = require("./Command");

const intents = new Intents(32767);

class Client extends Discord.Client {
  constructor(options) {
    super({ intents });
    /**
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Collection();
    this.aliases = new Collection();
  }
}

module.exports = Client;

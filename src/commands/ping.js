const Command = require("../structures/Command.js");

module.exports = new Command({
  name: "ping",
  description: "Shows the ping of the bot.",

  async run(msg, args, client) {
    const message = await msg.reply(`Pong: ${client.ws.ping} ms!`);

    message.edit(
      `Pong: **${client.ws.ping} ms!**\nMessage Ping: **${message.createdTimestamp - msg.createdTimestamp
      } ms!**`
    );
  },
});

const voice = require("@discordjs/voice");
const embed = require("../utils/embeds.js");

module.exports = {
  name: "leave",
  aliases: ["stop", "clear", "exit"],

  async run(msg, args, client) {
    msg.channel.sendTyping();
    const songQueue = msg.client.queue.get(msg.guild.id);

    if (!msg.member.voice.channel) {
      return msg.reply(
        "You need to be in a Voice Channel to execute this command!"
      );
    }

    if (!songQueue) {
      return msg.reply({ embeds: [embed.NOT_PLAYING_MESSAGE] });
    }

    songQueue.songs = [];
    msg.channel.send("👋 Cya! Hope you had a great time.");
    voice.getVoiceConnection(msg.guild.id).destroy();
  },
};

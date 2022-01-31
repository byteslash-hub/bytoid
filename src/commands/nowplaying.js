const embed = require('../utils/embeds.js');

module.exports = {
  name: "nowplaying",
  aliases: ["np", "now"],
  async run(msg, args, client) {
    msg.channel.sendTyping();
    const songQueue = msg.client.queue.get(msg.guild.id);
    
    if (!msg.member.voice.channel) {
      return msg.reply('You need to be in a Voice Channel to execute this command!');
    }
    
    if (!songQueue) {
      return msg.reply({ embeds: [embed.NO_QUEUE_MESSAGE]});
    }
    
    const song = songQueue.songs[0]
    songQueue.textChannel.send(embed.NOW_PLAYING_MESSAGE(msg.guild, song));
  }
}
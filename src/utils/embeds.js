const Discord = require('discord.js');
const emotes = require('../utils/strings.js');
const moment = require('moment');
require("dotenv").config();
const PREFIX = process.env.PREFIX;


const CONNECT_VOICE_MESSAGE = new Discord.MessageEmbed()
  .setTitle("Please Join Voice Channel")
  .setDescription("Mr.Hooman is scared of being alone in a Voice Channel! Please join a Voice Channel before executing this command.")
  .setThumbnail(emotes.sad)
  .setColor('#FAC11B');


const MISSING_CONNECT_PERM_MESSAGE = new Discord.MessageEmbed()
  .setTitle("Missing __**Connect**__ Permission")
  .setDescription("Mr.Hooman is sad on the fact that you don't trust him. C'mon look at his eyes. What made you remove his **Connect** perms?")
  .setThumbnail(emotes.sad)
  .setColor('#FAC11B');


const MISSING_VOICE_PERM_MESSAGE = new Discord.MessageEmbed()
  .setTitle("Missing __**Speak**__ Permission")
  .setDescription("Mr.Hooman is sad on the fact that you don't trust him. C'mon look at his eyes. What made you remove his **Speak** perms?")
  .setThumbnail(emotes.sad)
  .setColor('#FAC11B');


const MISSING_QUERY_MESSAGE = new Discord.MessageEmbed()
  .setTitle("Couldn't find a search query")
  .setDescription(`As Mr.Hooman can't read your mind yet (maybe in future?), it's important for you to add in a query!`)
  .setThumbnail(emotes.nerdy)
  .setColor('#FAC11B')
  .setFooter({text: `Type \`${PREFIX + "help play"}\` to learn more`});


const ERROR_PLAYING_MESSAGE = new Discord.MessageEmbed()
  .setTitle("Oops! Something went wrong")
  .setDescription(`Mr.Hooman was having trouble playing your music. Please [contact](https://discord.gg/KdFDYwpCa5) his therapist and talk to him on this!`)
  .setThumbnail(emotes.nerdy)
  .setColor('#FAC11B');

const ADDED_QUEUE_MESSAGE = function(song) {
  const newEmbed = new Discord.MessageEmbed()
    .setTitle(`*${song.title}* added to Queue`)
    .setDescription(`Try \`${PREFIX}autoqueue\` to automatically fill up the queue with songs related to the current song!`)
    .setThumbnail(song.thumbnail)
    .setColor('#FAC11B');

  return newEmbed;
}

const NOW_PLAYING_MESSAGE = function(guild, song) {
  queue = guild.client.queue;
  console.log(song)
  const songQueue = queue.get(guild.id);
  const startTime = moment(song.startTime, "YYYY-MM-DD HH:mm:ss");
  const currentTime = moment(new Date());

  var duration = moment(currentTime).subtract(startTime).format("HH:mm:ss").toString();
  duration = duration.split(":");
  duration = parseInt(duration[0]) * 60 * 60 + parseInt(duration[1]) * 60 + parseInt(duration[2]);

  var progress = song.duration != null ? duration / song.duration : 0;
  if (progress > 1) progress = 1;
  const progressBar = "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
  var progressBarView = progressBar.slice(0, Math.floor(progress * progressBar.length)) + "🔵" + progressBar.slice(0, Math.floor((1 - progress) * progressBar.length));

  const newEmbed = new Discord.MessageEmbed()
    .setDescription(`[${song.title}](${song.url})`)
    .setThumbnail(song.thumbnail)
    .setColor('#FAC11B')
    .addField(`\`${progressBarView}\``, `\`${dispTime(duration)} - ${dispTime(song.duration)}\``)
    .setFooter({text: `Requested By: ${song.requested}. Try ${PREFIX}autoqueue`})
    .setAuthor({name: 'Now Playing', iconURL: emotes.swag})

  return newEmbed;
}

function dispTime(time) {
  const sec = time % 60;
  const min = Math.floor((time / 60) % 60);
  const hour = Math.floor(time / 60 / 60);

  const timeString = hour ? ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2) : ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);

  return timeString;
}


module.exports = {
  "CONNECT_VOICE_MESSAGE": CONNECT_VOICE_MESSAGE,
  "MISSING_CONNECT_PERM_MESSAGE": MISSING_CONNECT_PERM_MESSAGE,
  "MISSING_VOICE_PERM_MESSAGE": MISSING_VOICE_PERM_MESSAGE,
  "MISSING_QUERY_MESSAGE": MISSING_QUERY_MESSAGE,
  "ERROR_PLAYING_MESSAGE": ERROR_PLAYING_MESSAGE,
  "NOW_PLAYING_MESSAGE": NOW_PLAYING_MESSAGE,
  "ADDED_QUEUE_MESSAGE": ADDED_QUEUE_MESSAGE,
}


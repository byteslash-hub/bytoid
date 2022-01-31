const Discord = require('discord.js');
const emotes = require('../utils/strings.js');
const moment = require('moment');
require("dotenv").config();
const PREFIX = process.env.PREFIX;


const CONNECT_VOICE_MESSAGE = new Discord.MessageEmbed()
    .setTitle("⚠ Please Join Voice Channel")
    .setDescription("Mr.Hooman is scared of being alone in a Voice Channel! Please join a Voice Channel before executing this command.")
    .setThumbnail(emotes.sad)
    .setColor('#2F3136');


const MISSING_CONNECT_PERM_MESSAGE = new Discord.MessageEmbed()
    .setTitle("⚠ Missing __**Connect**__ Permission")
    .setDescription("Mr.Hooman is sad on the fact that you don't trust him. C'mon look at his eyes. What made you remove his **Connect** perms?")
    .setThumbnail(emotes.sad)
    .setColor('#2F3136');


const MISSING_VOICE_PERM_MESSAGE = new Discord.MessageEmbed()
    .setTitle("⚠ Missing __**Speak**__ Permission")
    .setDescription("Mr.Hooman is sad on the fact that you don't trust him. C'mon look at his eyes. What made you remove his **Speak** perms?")
    .setThumbnail(emotes.sad)
    .setColor('#2F3136');


const MISSING_QUERY_MESSAGE = new Discord.MessageEmbed()
    .setTitle("⁉ Couldn't find a search query")
    .setDescription(`As Mr.Hooman can't read your mind yet (maybe in future?), it's important for you to add in a query!`)
    .setThumbnail(emotes.nerdy)
    .setColor('#2F3136')
    .setFooter({text: `Type \`${PREFIX + "help play"}\` to learn more`});


const ERROR_PLAYING_MESSAGE = new Discord.MessageEmbed()
    .setTitle("Oops! Something went wrong")
    .setDescription(`Mr.Hooman was having trouble playing your music. Please [contact](https://discord.gg/KdFDYwpCa5) his therapist and talk to him on this!`)
    .setThumbnail(emotes.nerdy)
    .setColor('#2F3136');
   

const ADDED_QUEUE_MESSAGE = (song) => {
  return new Discord.MessageEmbed()
    .setTitle(`🎶 ${song.title}`)
    .setAuthor({name: 'Added to Queue', iconURL: emotes.yes})
    .setURL(song.url)
    .setDescription(`Try \`${PREFIX}autoqueue\` to automatically fill up the queue with songs related to the current song!`)
    .setThumbnail(song.thumbnail)
    .setColor('#2F3136');
}


const NOW_PLAYING_MESSAGE = (song) => {
  const startTimeObject = momentToObject(song.startTime);

  var duration = moment().subtract(startTimeObject).format("HH:mm:ss").toString();
  duration = duration.split(":");
  duration = parseInt(duration[0]) * 60 * 60 + parseInt(duration[1]) * 60 + parseInt(duration[2]);

  var progress = song.duration != null ? duration / song.duration : 0;
  if (progress > 1) progress = 1;
  const progressBarFilled = "<:f_:937347975892590602>";
  const progressBarNotFilled = "<:n_:937347975934521344>";
  var progressBarView = "**[**" + progressBarFilled.repeat(progress*10) + "🔵" + progressBarNotFilled.repeat((1-progress)*10) + "**]**";

  return new Discord.MessageEmbed()
    .setDescription(`[${song.title}](${song.url})`)
    .setThumbnail(song.thumbnail)
    .setColor('#2F3136')
    .addField(`\`⏳ Progress Bar\``, progressBarView)
    .addField(`\`⏲ Elapsed Time\``, dispTime(duration), true)
    .addField(`\`⏲ Total Time\``, dispTime(song.duration), true)
    .setFooter({text: `Requested By: ${song.requested}. Try ${PREFIX}autoqueue`})
    .setAuthor({name: 'Now Playing', iconURL: emotes.swag})
}


function momentToObject(momentTime){
  const temp = momentTime.toString().split(" ").map(x => parseInt(x));
  return {
    years: temp[0],
    months: temp[1],
    days: temp[2],
    hours: temp[3],
    minutes: temp[4],
    seconds: temp[5]
  };
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


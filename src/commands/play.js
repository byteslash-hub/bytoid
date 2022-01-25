const Command = require("../structures/Command.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const moment = require("moment");
const embed = require("../utils/embeds.js");
const {
  joinVoiceChannel,
  entersState,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

module.exports = new Command({
  name: "play",
  aliases: ["p"],
  description: "Plays a song. Use play <song name or url>",

  async run(msg, args, client) {
    const voiceChannel = msg.member.voice.channel;

    //Checking if user is connected to Voice Channel
    if (!voiceChannel) {
      return msg.channel.send({embeds: [embed.CONNECT_VOICE_MESSAGE]});
    }

    //Check if bot has all the necessary perms
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send({embeds: [embed.MISSING_CONNECT_PERM_MESSAGE]});
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send({embeds: [embed.MISSING_VOICE_PERM_MESSAGE]});
    }

    //Server queue. We are getting this server queue from the global queue.
    const serverQueue = client.queue.get(msg.guild.id);
    if (!args.length) return msg.channel.send({embeds: [embed.MISSING_QUERY_MESSAGE]});

    //Typing indicator
    msg.channel.sendTyping();

    let song = {};

    //If the query is a link
    if (ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        thumbnail: songInfo.videoDetails.thumbnails[0].url,
        duration: parseInt(songInfo.videoDetails.lengthSeconds),
        startTime: "",
        requested: msg.author.username,
      };
    }

    //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
    else {
      const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
      };
      const video = await videoFinder(args.join(" "));
      if (video) {
        song = {
          title: video.title,
          url: video.url,
          thumbnail: video.thumbnail,
          duration: video.seconds,
          startTime: "",
          requested: msg.author.username,
        };
      } else {
        msg.channel.send({embeds: [embed.ERROR_PLAYING_MESSAGE]});
      }
    }

    //If the server queue does not exist, create one!
    if (!serverQueue) {
      const queueConstructor = {
        voiceChannel: voiceChannel,
        textChannel: msg.channel,
        connection: null,
        songs: [],
      };

      //Add our key and value pair into the global queue. We then use this to get our server queue.
      client.queue.set(msg.guild.id, queueConstructor);
      queueConstructor.songs.push(song);

      //Establish a connection and play the song
      try {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: msg.guild.id,
          adapterCreator: msg.guild.voiceAdapterCreator,
        });
        queueConstructor.connection = connection;
        videoPlayer(msg.guild, queueConstructor.songs[0], connection);
      } catch (err) {
        client.queue.delete(msg.guild.id);
        msg.channel.send({embeds: [embed.ERROR_PLAYING_MESSAGE]});
        console.log(err);
      }
    } else {
      serverQueue.songs.push(song);
      return msg.channel.send({embeds: [embed.ADDED_QUEUE_MESSAGE(song)]});
    }
  },
});

/*
*
*/
//Let's bot Play songs
const videoPlayer = async (guild, song, connection) => {
  queue = guild.client.queue;
  const songQueue = queue.get(guild.id);

  if (!song) {
    songQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  songQueue.audioPlayer = await getSongPlayer(song);
  connection.subscribe(songQueue.audioPlayer);
  songQueue.isPlaying = true;

  songQueue.audioPlayer.on(AudioPlayerStatus.Idle, () => {
    songQueue.songs.shift();
    videoPlayer(guild, songQueue.songs[0]);
  });

  //Add start time to the song to calculate elapsed time later
  const currentTime = await moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  if (queue.get(guild.id).songs[0])
    queue.get(guild.id).songs[0].startTime = currentTime.toString();

  await songQueue.textChannel.send({embeds: [embed.NOW_PLAYING_MESSAGE(guild, song)]});
};

/*
*
*/
//Song Player
const getSongPlayer = async (song) => {
  const player = createAudioPlayer();
  const stream = ytdl(song.url, {
    filter: "audioonly",
    highWaterMark: 1 << 25, // Set buffer size
  });
  const resource = createAudioResource(stream, {
    inputType: StreamType.Arbitrary,
  });
  player.play(resource);
  return entersState(player, AudioPlayerStatus.Playing, 5_000);
};

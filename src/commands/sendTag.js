const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags.js")
const { error } = require("../utils/color")

module.exports = new Command({
    name: "tag",
    aliases: [],
    description: "Sends that a particular tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]

        if (args.length === 2) {
            tags.findOne({ name: tagName }, function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    try {
                        msg.reply(data.message)
                    }
                    catch (err) {
                        const errorEmbed = new Discord.MessageEmbed()
                            .setDescription("That tag doesn't exist")
                            .setColor(error)
                        msg.reply({ embeds: [errorEmbed] })
                    }
                }
            })
        }
        else {
            const errorEmbed = new Discord.MessageEmbed()
                .setDescription('Invalid number of arguments')
                .setColor(error)
            msg.reply({ embeds: [errorEmbed] })
        }
    }
});

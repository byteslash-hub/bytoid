const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags.js")
const { error } = require("../utils/color.js")

module.exports = new Command({
    name: "tag",
    description: "Sends that a particular tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]

        tags.findOne({ name: tagName }, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                try {
                    msg.reply(data.message)
                }
                catch (error) {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setDescription("That tag doesn't exist")
                        .setColor(error)
                    msg.reply({ embeds: [errorEmbed] })
                }
            }
        })
    },
});
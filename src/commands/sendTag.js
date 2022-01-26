const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags")

module.exports = new Command({
    name: "tag",
    description: "Creates a new tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]

        tags.findOne({ name: tagName }, function (err, data) {
            if (err) {
                console.log(err)
            }
            else {
                try {
                    const successEmbed = new Discord.MessageEmbed()
                        .setDescription(data.message)
                        .setColor("#5865F2")
                    msg.reply({ embeds: [successEmbed] })
                }
                catch (error) {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setDescription("That tag doesn't exist")
                        .setColor("#ff6347")
                    msg.reply({ embeds: [errorEmbed] })
                }
            }
        })
    },
});

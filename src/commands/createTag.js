const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags")

module.exports = new Command({
    name: "createTag",
    description: "Creates a new tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]
        const message = messageArray.join(" ")

        const tag = new tags({
            name: tagName,
            message: message
        })

        tags.findOne({ name: tagName }, function (err, data) {
            if (data) {
                const alreadyExistsEmbed = new Discord.MessageEmbed()
                    .setDescription("That tag already exists!")
                    .setColor("#ff6347")
                msg.reply({ embeds: [alreadyExistsEmbed] })
            }
            else {
                tag.save((err, response) => {
                    if (err) {
                        const errorEmbed = new Discord.MessageEmbed()
                            .setDescription("An error occurred :(")
                            .setColor("#ff6347")
                        msg.reply({ embeds: [errorEmbed] })
                    }
                    const successEmbed = new Discord.MessageEmbed()
                        .setDescription(`Added ${tagName} tag`)
                        .setColor("#12AD2B")
                    msg.reply({ embeds: [successEmbed] })
                })
            }
        })
    },
});

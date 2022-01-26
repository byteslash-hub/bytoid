const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags.js")
const { success, error } = require("../utils/color.js")

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
                    .setColor(error)
                msg.reply({ embeds: [alreadyExistsEmbed] })
            }
            else {
                tag.save((err, response) => {
                    if (err) {
                        const errorEmbed = new Discord.MessageEmbed()
                            .setDescription("An error occurred :(")
                            .setColor(error)
                        msg.reply({ embeds: [errorEmbed] })
                    }
                    const successEmbed = new Discord.MessageEmbed()
                        .setDescription(`Added \`${tagName}\` tag`)
                        .setColor(success)
                    msg.reply({ embeds: [successEmbed] })
                })
            }
        })
    },
});
const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags.js")
const { success, error } = require("../utils/color.js")

module.exports = new Command({
    name: "deleteTag",
    description: "Deletes an existing tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]

        tags.findOneAndDelete({ name: tagName }, function (err, data) {
            if (data) {
                const successEmbed = new Discord.MessageEmbed()
                    .setDescription(`Successfully deleted \`${tagName}\` tag`)
                    .setColor(success)
                msg.reply({ embeds: [successEmbed] })
            }
            else {
                const errorEmbed = new Discord.MessageEmbed()
                    .setDescription(`Didn't find any tag named \`${tagName}\``)
                    .setColor(error)
                msg.reply({ embeds: [errorEmbed] })
            }
        })
    },
});

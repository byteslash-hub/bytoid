const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags")

module.exports = new Command({
    name: "updateTag",
    description: "Updates an existing tag",

    async run(msg, args, client) {
        const messageArray = args.slice(2, args.length)
        const tagName = args[1]
        const message = messageArray.join(" ")

        tags.findOneAndUpdate({ name: tagName }, { message: message }, function (err, data) {
            if (data) {
                const successEmbed = new Discord.MessageEmbed()
                    .setDescription("Successfully updated the tag!")
                msg.reply({ embeds: [successEmbed] })
            }
            else {
                const errorEmbed = new Discord.MessageEmbed()
                    .setDescription(`Didn't find any tag named \`${tagName}\``)
                msg.reply({ embeds: [errorEmbed] })
            }
        })
    },
});

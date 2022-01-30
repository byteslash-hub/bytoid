const Discord = require("discord.js")

const Command = require("../structures/Command.js");
const tags = require("../database/schema/tags.js")
const { success, error } = require("../utils/color.js")

module.exports = new Command({
    name: "deleteTag",
    description: "Deletes an existing tag",

    async run(msg, args, client) {
        if (!msg.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            const noPermEmbed = new Discord.MessageEmbed()
                .setDescription("<:the_bonk:843682837210202122> Nice try, but I won't accept your try tho")
                .setColor(error)
            msg.reply({ embeds: [noPermEmbed] })
        }
        else {
            if (args.length === 2) {
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
            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setDescription("Invalid number of arguments")
                    .setColor(error)
                msg.reply({ embeds: [embed] })
            }

        }
    }
});

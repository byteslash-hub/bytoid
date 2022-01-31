const PREFIX = process.env.PREFIX;

module.exports = {
  name: "messageCreate",
  run(msg) {
    if (!msg.content.startsWith(PREFIX)) return;
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);

    if (args[0] == "") return;

    const command = msg.client.commands.find(
      (cmd) =>
        cmd.name == args[0] ||
        cmd.aliases.includes(`$args[0]}`) ||
        cmd.name == ` ${args[0]}` ||
        cmd.aliases.includes(` ${args[0]}`)
    );

    if (!command) {
      msg.reply("Not a valid command!");
      return;
    } else {
      command.run(msg, args, msg.client);
    }
  },
};

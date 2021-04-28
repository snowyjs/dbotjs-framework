module.exports = (message, client) => {
    message = client.util.message(message, client);
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.prefix;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content.toLowerCase())) return;
    const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const command = this.args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) {
        cmd.run(client, message, args).catch(e => {
            return message.error(e);
        })
    }
}
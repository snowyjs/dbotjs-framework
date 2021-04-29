const Discord = require("discord.js");

class DFClient extends Discord.Client {
    constructor(settings, options = {}) {
        super(options);

        this.config = require("./configuration.js")(settings);
        this.util = {
            message: require("./util/messageFunctions"),
            load: require("./util/load"),
        }
        this.load = this.util.load;

        if (!this.config.token) throw Error("You must specify a token");
        if (this.config.commands) this.commands = this.load.cmdloader();

        this.on("ready", () => {
            this.user.setActivity(this.config.status, { type: this.config.statusType });
            console.log(`${this.user.username} is ready to use! Loaded ${this.commands.size} commands`);
        });

        this.on("message", (message) => {
            message = this.util.message(message, this);
            if (message.author.bot || message.channel.type === 'dm') return;

            const prefix = this.config.prefix;

            const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(<@!?${this.user.id}>|${escapeRegex(prefix)})\\s*`);

            if (!prefixRegex.test(message.content.toLowerCase())) return;
            const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

            this.args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            this.command = this.args.shift().toLowerCase();

            const cmd = this.commands.get(this.command) || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(this.command));

            if (cmd) {
                cmd.run(this, message, this.args).catch(e => {
                    return message.error(e);
                })
            }
        })
    }

    async connect() {
        await super.login(this.config.token);
    }

    async disconnect() {
        return this.destroy();
    }
}

module.exports = DFClient;

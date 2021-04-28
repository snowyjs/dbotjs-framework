const Discord = require("discord.js");

class DFClient extends Discord.Client {
    constructor(settings, options = {}) {
        super(options);

        this.config = require("./configuration.js")(settings);
        this.util = {
            message: require("./util/messageFunctions"),
            msghandler: require("./util/messageHandler"),
            load: require("./util/load")
        }
        this.load = this.util.load;

        if(!this.config.token) throw Error("You must specify a token");
        if (this.config.commands) this.commands = this.load.cmdloader();

        this.on("message", message => {
            const prefix = this.config.prefix;

            const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

            if (!prefixRegex.test(message.content.toLowerCase())) return;
            const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

            const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        })

        this.on("ready", () => {
            this.user.setActivity(this.config.status, { type: this.config.statusType });
            console.log(`${this.user.username} is ready to use! Loaded ${this.commands.size} commands`);
        });
    }

    async connect() {
        await super.login(this.config.token);
    }

    disconnect() {
        return this.destroy();
    }

    loadCommands() {
        fs.readdirSync('./commands').forEach(dirs => {
            const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    
            if (client.shard.ids[0] === 0) console.log(`\x1b[33mLoaded \x1b[35m${commands.length} commands of \x1b[34m${dirs}\x1b[33m \x1b[32msuccessfully \u001b[0m`)
            for (const file of commands) {
                const command = require(`../commands/${dirs}/${file}`);
                client.commands.set(command.name.toLowerCase(), command);
            };
        });
    }
}

module.exports = DFClient;
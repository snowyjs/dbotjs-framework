const Discord = require("discord.js");

class DFClient extends Discord.Client {
    constructor(settings, options = {}) {
        super(options);

        this.config = require("./configuration.js")(settings);
        this.messageFunction = require("./util/messageFunctions");
        this.handlers = require("./util/handlers");

        if (!this.config.token) throw Error("You must specify a token");
        this.commands = this.handlers.loadCommands();

        this.on("ready", () => {
            this.user.setActivity(this.config.status, { type: this.config.statusType });
            console.log(`${this.user.username} is ready to use! Loaded ${this.commands.size} commands`);
        });

        const messageEvent = require(`./events/message.js`);
        this.on("message", messageEvent.bind(null, this));
    }

    async connect() {
        await super.login(this.config.token);
    }

    async disconnect() {
        return this.destroy();
    }
}

module.exports = DFClient;

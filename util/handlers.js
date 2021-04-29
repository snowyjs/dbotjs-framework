const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    loadCommands: function (map = `${process.cwd()}/commands`) {
        commands = new Discord.Collection();

        fs.readdir("./commands", (err, files) => {
            if (err) console.log(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if (jsFiles.length <= 0) {
                return;
            }
            jsFiles.forEach((f, i) => {
                const command = require(`${map}/${f}`);
                commands.set(command.name.toLowerCase(), command);
            })
        });

        return commands;
    }
}
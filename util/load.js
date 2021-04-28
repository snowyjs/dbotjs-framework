const { Collection } = require("discord.js");
const { existsSync, statSync, readFileSync } = require("fs");
const fsscanner = require("fsscanner");

module.exports = {
    cmdloader: function (dir = `${process.cwd()}/commands`) {
        let commands = new Collection();
        if (existsSync(dir)) {
            fsscanner.scan(dir, [], (err, results) => {
                if (err) throw err;
                results.forEach(file => {
                    let stats = statSync(file);
                    if (stats.isDirectory()) this.cmdloader(`${file}`);
                    else {
                        delete require.cache[require.resolve(file)];
                        let command = require(file);
                        commands.set(command.name, command);
                    }
                })
            })
        }
        return commands;
    }
}
module.exports = (config) => {
    return {
        token: config.token,
        prefix: config.prefix || "!",
        status: config.status || "test",
        commands: config.commands !== undefined ? config.commands : true,
        statusType: config.statusType !== undefined ? config.statusType.toUpperCase() : "WATCHING",
        embedColor: config.embedColor
    };
}
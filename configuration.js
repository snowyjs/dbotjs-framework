module.exports = (config) => {
    return {
        token: config.token,
        prefix: config.prefix || "!",
        status: config.status || "DbotJS",
        statusType: config.statusType !== undefined ? config.statusType.toUpperCase() : "PLAYING",
        embedColor: config.embedColor
    };
}
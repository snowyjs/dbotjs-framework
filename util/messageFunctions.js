const { MessageEmbed } = require("discord.js");

module.exports = (message, client) => {
    message.embed = () => {
        return new MessageEmbed()
            .setColor(client.config.embedColor || "#9cd4ff")
            .setTimestamp()
            .setFooter(`© ${client.config.servername || message.guild.name} - ${message.author.username}`);
    }

    message.error = (text) => {
        return message.channel.send(message.embed()
            .setDescription(`❌ - ${text}`)
            .setColor("#ff0000")
        )
    }

    message.succes = (text) => {
        return message.channel.send(message.embed()
            .setDescription(`✔ - ${text}`)
            .setColor("#00ff00")
        )
    }

    message.sendEmbed = ({ embed: embed = message.embed(), title: title, desc: desc, color: color, footer: footer }) => {
        if (title) embed.setTitle(title);
        if (desc && desc.length >= 2048) embed.setDescription(desc.substr(0, 2044) + "...");
        else if (desc >= 2048) embed.setDescription(desc);
        if (color) embed.setColor(color);
        if (footer) embed.setFooter(footer);
        return message.channel.send(embed);
    }

    return message;
}
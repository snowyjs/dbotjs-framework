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
            .setDescription(`✅ - ${text}`)
            .setColor("#00ff00")
        )
    }

    message.sendEmbed = ({ embed: embed = message.embed(), title: title, desc: desc, color: color }) => {
        if (title) embed.setTitle(title);
        if (desc) embed.setDescription(desc);
        if (color) embed.setColor(color);
        return message.channel.send(embed);
    }

    message.getMember = (member) => {
        return message.mentions.members.first() || message.guild.members.cache.get(member);
    }

    message.getChannel = (channel) => {
        return message.mentions.channels.first() || message.guild.channels.cache.get(channel);
    }

    message.getRole = (role) => {
        return message.mentions.roles.first() || message.guild.roles.cache.get(role);
    }

    message.member.isAdmin = () => {
        if (message.member.hasPermission("ADMINISTRATOR")) return true;
    }

    message.member.isOwner = () => {
        if (message.guild.ownerID == message.author.id) return true;
    }


    return message;
}
const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite, owner } = require('../config');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');
    if (message.author.id !== owner && message.author.id !== "458923143277445121") return;


    if (args[0] == null || args[0] == undefined || args[0] == "") return message.channel.send('Mention a user after the command!').then(msg => {
        msg.delete(2500)
    });

    const patEmbed = new RichEmbed()
    .setDescription(`**${message.author} thinks that ${args[0]} is the cutest!**`)
    .setTimestamp()
    .setImage("https://66.media.tumblr.com/09aea0e55273b5b4560e4de09602487c/tumblr_olhzo7RrbB1vgxetdo1_400.jpg")
    .setColor(embedColor);

    await message.channel.send(patEmbed);
};

exports.help = {
    name: 'franky',
    aliases: ['frankycute'],
    description: 'Hidden command!',
    help: 'franky {@user}'
};

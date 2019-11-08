const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite } = require('../config');
const { noBotPerms } = require('../utils/errors');
var fs = require('fs');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');
    if (!perms.has('VIEW_CHANNEL')) return noBotPerms(message, 'VIEW_CHANNEL');

    const patEmbed = new RichEmbed()
    .setAuthor(`${message.member.user.tag} pats ${args[0]}`)
    .setImage(link);
    .setTimestamp()
    .setColor(embedColor);

    await message.channel.send(patEmbed);
};

exports.help = {
    name: 'pat',
    aliases: ['actionpat'],
    description: 'Pat a user!',
    help: 'pat @user'
};

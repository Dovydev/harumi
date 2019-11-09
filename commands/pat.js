const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite } = require('../config');
const { noBotPerms } = require('../utils/errors');
var lineReader = require('line-reader');
var links = [];

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');

    lineReader.eachLine('../akane/actions/pat.txt', function(line, last) {
        links.push(`${line}`);
    });

    const patEmbed = new RichEmbed()
    .setDescription(`${message.member.user.tag} pats ${args[0]}`)
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

const { RichEmbed } = require('discord.js');
const { embedColor, discord, owner } = require('../config');
const { version } = require('../package.json');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    const infoEmbed = new RichEmbed()
        .setTitle(client.user.username)
        .setDescription('Discord bot that makes your day! Play and manage your servers!')
        .setColor(embedColor)
        .addField('Bot Author', `<@${owner}>`)
        .addField('Support Discord', discord)
        .addField('Bot Version', version)
        .setFooter('© 2019 Dovydev.com & Leakoni.net Development');

    message.channel.send(infoEmbed);
};

exports.help = {
    name: 'info',
    aliases: ['botinfo'],
    description: 'View bot information.',
    usage: 'info'
};

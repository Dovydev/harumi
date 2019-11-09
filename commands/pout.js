const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite } = require('../config');
const { noBotPerms } = require('../utils/errors');
const { images } = require('../actions/pout.json')

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');

    var count = Object.keys(images).length;
    var rnd = Math.floor(Math.random() * count);

    const patEmbed = new RichEmbed()
    .setTimestamp()
    .setImage(images[rnd])
    .setColor(embedColor);

    await message.channel.send(patEmbed);
};

exports.help = {
    name: 'pout',
    aliases: ['actionpout'],
    description: 'Pout a user!',
    help: 'pout'
};

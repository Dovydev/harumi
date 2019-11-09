const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite } = require('../config');
const { noBotPerms } = require('../utils/errors');
const { images } = require('../actions/cuddle.json')

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');

    var count = Object.keys(images).length;
    var rnd = Math.floor(Math.random() * count);
    var text = args.splice(1).join(" ");

    if (args[0] == null || args[0] == undefined || args[0] == "") return message.channel.send('Mention a user after the command!').then(msg => {
        msg.delete(2500)
    });

    const patEmbed = new RichEmbed()
    .setDescription(`**${message.author} cuddles with ${args[0]} ${text}**`)
    .setTimestamp()
    .setImage(images[rnd])
    .setColor(embedColor);

    await message.channel.send(patEmbed);
};

exports.help = {
    name: 'cuddle',
    aliases: ['actioncuddle'],
    description: 'Cuddle with user!',
    help: 'cuddle {@user}'
};

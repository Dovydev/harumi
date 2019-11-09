const { RichEmbed } = require('discord.js');
const { embedColor, discord, invite } = require('../config');
const { noBotPerms } = require('../utils/errors');
const { images } = require('../actions/mad.json')

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');

    var count = Object.keys(images).length;
    var rnd = Math.floor(Math.random() * count);
    var text = args.splice(1).join(" ");
    var desc;

    if(args[0] == null || args[0] == undefined || args[0] == ""){
        desc = "";
    }
    else{
        desc = `at ${args[0]} ${text}`;
    }

    const patEmbed = new RichEmbed()
    .setDescription(`**${message.author} is mad ${desc}**`)
    .setTimestamp()
    .setImage(images[rnd])
    .setColor(embedColor);

    await message.channel.send(patEmbed);
};

exports.help = {
    name: 'mad',
    aliases: ['actionmad'],
    description: 'Be mad, or be mad at someone!',
    help: 'pat {@user}'
};

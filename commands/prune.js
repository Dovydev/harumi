const { RichEmbed } = require('discord.js');
const { embedColor, discord, owner } = require('../config');
const { version } = require('../package.json');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('MANAGE_MESSAGES')) return noBotPerms(message, 'MANAGE_MESSAGES');
    if (!perms.has('VIEW_CHANNEL')) return noBotPerms(message, 'VIEW_CHANNEL');

    var amount = args[0];

    if (message.member.hasPermission(['MANAGE_MESSAGES', 'VIEW_CHANNEL'])) {
        if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!');
        if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!');
        if (amount < 1) return message.reply('You have to delete at least 1 message!');

        await message.channel.fetchMessages({ limit: amount }).then(messages => {
            message.channel.bulkDelete(messages)
        });

        const pruneEmbed = new RichEmbed()
            .setAuthor('Akane', client.user.avatarURL)
            .setDescription(`${amount} messages was removed!`)
            .setTimestamp();

    	message.channel.send(pruneEmbed)
            .then(msg => {
                msg.delete(2000)
            });

    }
    else{
        message.channel.send("You don't have the permissions.");
    }

    message.channel.send(infoEmbed);
};

exports.help = {
    name: 'prune',
    aliases: ['chatprune'],
    description: 'Prune messages in a chat.',
    usage: 'prune {ammount}'
};

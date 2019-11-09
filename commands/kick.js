const { RichEmbed } = require('discord.js');
const { embedColor, discord, owner } = require('../config');
const { version } = require('../package.json');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('BAN_MEMBERS')) return noBotPerms(message, 'BAN_MEMBERS');

    var user = message.mentions.members.first();
    var reason = args.splice(1).join(" ");
    var guildid = message.guild.id;
    var channel = message.guild.channels.find(channel => channel.name === "logs");

    if (message.member.hasPermission(['BAN_MEMBERS', 'VIEW_CHANNEL'])) {

        if (!user) {
            try {
                // Check if a valid userID has been entered instead of a Discord user mention
                if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                user = message.guild.members.get(args.slice(0, 1).join(' '));
                user = user.user;
                }
                catch (error) {
                    return message.reply('Couldn\' get a Discord user with this userID!')
                    .then(msg => {
                        msg.delete(2500)
                    });
                }
        }

        if (user === message.author) return message.channel.send('You can\'t kick yourself').then(msg => {
            msg.delete(2500)
        });
        if (!reason) return message.reply('You forgot to enter a reason for this kick!').then(msg => {
            msg.delete(2500)
        });
        if (!message.guild.member(user).bannable) return message.reply('You can\'t kick this user because you or the bot has not sufficient permissions!').then(msg => {
            msg.delete(2500)
        });

        await user.kick(reason)
            .then(() => console.log(`Kicked ${member.displayName}`))
            .catch(console.error);

        const kickEmbed = new RichEmbed()
            .setAuthor(`${message.member.user.tag} (${message.member.user.id})`, message.member.user.avatarURL)
            .setDescription(`**Member:** ${user} (${user.id})
                **Action:** kick
                **Reason:** ${reason}`)
            .setFooter(`Case 0`)
            .setThumbnail(user.avatarURL)
            .setColor("#ffff00")
            .setTimestamp();

        if(channel){
            await channel.send(banEmbed);
        }else{
            await message.guild.createChannel('logs',  { type: 'text' }).then(x => {x.send(banEmbed)});
        }

    	//message.channel.send(kickEmbed);

    }
    else{
        message.channel.send("You don't have the permissions.");
    }
};

exports.help = {
    name: 'kick',
    aliases: ['userkick'],
    description: 'Kick user from server.',
    usage: 'kick {@user} {reason}'
};

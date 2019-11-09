const { RichEmbed } = require('discord.js');
const { embedColor, discord, owner } = require('../config');
const { version } = require('../package.json');
const { noBotPerms } = require('../utils/errors');
const fs = require('fs');

var readJson = (path, cb) => {
    fs.readFile(require.resolve(path), (err, data) => {
        if (err)
        cb(err)
        else
        cb(null, JSON.parse(data))
    })
}


exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('BAN_MEMBERS')) return noBotPerms(message, 'BAN_MEMBERS');

    var user = message.mentions.users.first();
    var reason = args.splice(1).join(" ");
    var guildid = message.guild.id;

    readJson('../logging/casenumber.json', (err, caseids) => {
        caseids.push(`{"${guildid}":0}`);
        done(err);
    });

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

        if (user === message.author) return message.channel.send('You can\'t ban yourself').then(msg => {
            msg.delete(2500)
        });
        if (!reason) return message.reply('You forgot to enter a reason for this ban!').then(msg => {
            msg.delete(2500)
        });
        if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user because you the bot has not sufficient permissions!').then(msg => {
            msg.delete(2500)
        });

        const banEmbed = new RichEmbed()
            .setAuthor(`${message.member.user.tag} (${message.member.user.id})`, message.member.user.avatarURL)
            .setDescription(`**Member:** ${user}
                **Action:** ban
                **Reason:** ${reason}`)
            .setFooter(`Case ${caseid}`)
            .setTimestamp();

        caseid = caseid + 1;

    	message.channel.send(banEmbed);

    }
    else{
        message.channel.send("You don't have the permissions.");
    }
};

exports.help = {
    name: 'ban',
    aliases: ['userban'],
    description: 'Ban user from server.',
    usage: 'ban {@user} {reason}'
};

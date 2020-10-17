const Command = require('../../Structures/Command');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['banmember'],
      description: 'Bans mentioned member',
      category: 'Moderation',
      usage: 'ban <@user> [reason]'
    });
  }

  async run(message, args) {
    const Discord = require('discord.js');
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "logs")
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You need kick members permission to do this!");
    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ")
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: `They were banned by ${message.author.tag} with reason "${reason}"`,
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            const embed = new Discord.MessageEmbed()
              .setAuthor(`${user.tag} has been banned`, `${user.displayAvatarURL()}`)
              .addField('Reason: ', `${reason}` || `No reason specified`)
              .setFooter("Banned by " + message.author.tag)
              .setTimestamp()
            message.channel.send(embed)
            if (logchannel) {
              logchannel.send(embed)
            }
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member due to permissions.');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }

};

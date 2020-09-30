const Command = require('../../Structures/Command');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['kickmember'],
      description: 'Kicks mentioned member',
      category: 'Moderation',
      usage: 'kick <@user> [reason]'
    });
  }

  async run(message, args) {
    const Discord = require('discord.js');
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "logs")
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You need kick members permission to do this!");
    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ")
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick({
            reason: `They were kicked by ${message.author.tag} with reason "${reason}"`,
          })
          .then(() => {
            // We let the message author know we were able to kick the person
            const embed = new Discord.MessageEmbed()
              .setAuthor(`${user.tag} has been kicked`, `${user.displayAvatarURL()}`)
              .addField('Reason: ', `${reason}` || `No reason specified`)
              .setFooter("Kicked by " + message.author.tag)
              .setTimestamp()
            message.channel.send(embed)
            if (logchannel) {
              logchannel.send(embed)
            }
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to kick the member because I don't have permissions");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }

};

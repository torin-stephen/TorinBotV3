const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: 'warn',
      aliases: ['warnmember'],
      description: 'warn a guild member',
      category: 'Moderation',
      usage: '$warn <member> <reason>'
    });
  }

  async run(message, args) {
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "log")
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You need kick members permission to do this!");
    var user;
    user = message.mentions.members.first()
    if (!user) return message.channel.send("Please specifiy a user.")
    let reason = args.slice(1).join(" ")
    db.add(`warns_${message.guild.id}_${user.id}`, 1)

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.user.tag} has been warned`, `${user.user.displayAvatarURL()}`)
      .addField('Reason: ', `${reason}` || `No reason specified`)
      .addField('Warns: ', `${db.fetch(`warns_${message.guild.id}_${user.id}`)}`)
      .setFooter("Warned by " + message.author.tag)
      .setTimestamp()
    message.channel.send(embed)

  }

};

const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['rmwarns'],
      description: 'Removes warns from mentioned member',
      category: 'Moderation'
    });
  }

  async run(message, args) {
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "logs")
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You need kick members permission to do this!");
    var user;
    user = message.mentions.members.first()
    if (!user) return message.channel.send("Please specifiy a user.")
    let reason = args.slice(1).join(" ")
    db.set(`warns_${message.guild.id}_${user.id}`, 0)

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.user.tag} warns have been reset`, `${user.user.displayAvatarURL()}`)
      .addField('Reason: ', `${reason}` || `No reason specified`)
      .addField('Warns: ', `${db.fetch(`warns_${message.guild.id}_${user.id}`)}`)
      .setFooter("Reset by: " + message.author.tag)
      .setTimestamp()
    message.channel.send(embed)
    if (logchannel) {
      logchannel.send(embed)
    } 
  }

};

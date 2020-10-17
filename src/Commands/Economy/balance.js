const Command = require('../../Structures/Command');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bal'],
			description: 'Shows balance of mentioned member or author',
			category: 'Economy'
		});
	}

	async run(message, args) {
		let user = message.mentions.members.first() || message.author;

		let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

		if (bal < 0) {
			db.set(`money_${message.guild.id}_${user.id}`, 0)
		};

		if (bal === null) bal = 0;
		if (args[0]) {
			let embed = new MessageEmbed()
				.setAuthor(`${message.mentions.members.first().user.tag}'s Balance`, `${message.mentions.members.first().user.displayAvatarURL()}`)
				.setColor("GREEN")
				.addField(`Balance:`, `$${bal}`)
			message.channel.send(embed)
		} else {
			let embed = new MessageEmbed()
				.setAuthor(`${user.tag}'s Balance`, `${message.author.displayAvatarURL()}`)
				.setColor("GREEN")
				.addField(`Balance:`, `$${bal}`)
			message.channel.send(embed)
		}

	}

};

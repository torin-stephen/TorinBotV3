const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'weekly amount money up to 5000',
            category: 'Economy',
            usage: 'Usage: !weekly'
		});
	}

	async run(message, Discord) {
        let user = message.author;
        let timeout = 604800000 // 7 days in milliseconds
        let amount = Math.floor(Math.random() * 5000) + 1;

        let weekly = await db.fetch(`weekly_${message.guild.id}_${message.author.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            message.channel.send(`You have already collected your weekly reward this week, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**.`)
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`weekly`, `${message.author.displayAvatarURL()}`)
                .setColor("GREEN")
                .addField(`Collected`, `$${amount}`)
            
            message.channel.send(embed)
            db.add(`money_${message.guild.id}_${message.author.id}`, amount)
            db.set(`weekly_${message.guild.id}_${message.author.id}`, Date.now())
        }

	}

};

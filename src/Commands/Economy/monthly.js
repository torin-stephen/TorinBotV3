const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Monthly amount money up to 10000',
            category: 'Economy',
            usage: 'Usage: !monthly'
		});
	}

	async run(message, Discord) {
        let user = message.author;
        let timeout = 2592000000 // 30 days in milliseconds
        let amount = Math.floor(Math.random() * 10000) + 1;

        let monthly = await db.fetch(`monthly_${message.guild.id}_${user.id}`);

        if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));

            message.channel.send(`You have already collected your monthly reward this month, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**.`)
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`monthly`, `${message.author.displayAvatarURL()}`)
                .setColor("GREEN")
                .addField(`Collected`, `$${amount}`)
            
            message.channel.send(embed)
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`monthly_${message.guild.id}_${user.id}`, Date.now())
        }

	}

};

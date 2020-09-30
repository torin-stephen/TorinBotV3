const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Daily amount money up to 1000',
            category: 'Economy',
            usage: 'Usage: !daily'
        });
    }

    async run(message, Discord) {
        let user = message.author;
        let timeout = 86400000 // 24 hours in milliseconds
        let amount = Math.floor(Math.random() * 1000) + 1;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            message.channel.send(`You have already collected your daily reward today, you can come back and collect it in **${time.hours}h ${time.minutes}m ${time.seconds}s**.`)
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`Daily`, `${message.author.displayAvatarURL()}`)
                .setColor("GREEN")
                .addField(`Collected`, `$${amount}`)
            message.channel.send(embed)
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
        }
    }

};

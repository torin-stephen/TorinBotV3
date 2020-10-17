const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: '1 in 10000 chance to kill someone and take all their money',
            category: 'Economy',
            usage: 'Usage: $kill @user'
        });
    }

    async run(message, Discord) {
        let author = message.author;
        let timeout = 86400000 // 24 hours in milliseconds
        let killchance = Math.floor(Math.random() * 10000) + 1;
        let user = message.mentions.members.first()

        if (!user) {
            return message.channel.send('Sorry, you forgot to mention somebody.')
        }

        let killtime = await db.fetch(`killtime_${message.guild.id}_${author.id}`);
        let killbalance = db.fetch(`money_${message.guild.id}_${user.id}`)

        

        if (user.id === `472417108148617246`) { // If target is @Torin.#2640 ignore.
            return message.channel.send(":x: Unfortunately you cannot kill this person, due to their rank in the bots configuration.")
        };

        if (killtime !== null && timeout - (Date.now() - killtime) > 0) {
            let time = ms(timeout - (Date.now() - killtime));

            message.channel.send(`You have already tried to kill someone today try again in **${time.hours}h ${time.minutes}m ${time.seconds}s**.`)
        } else {
            if (killchance == 1) {
                let embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`YOU KILLED ${user.tag}`)
                    .setDescription(`YOU GAINED ${db.fetch(`money_${message.guild.id}_${user.id}`)}`)
                db.add(`money_${message.guild.id}_${author.id}`, killbalance)
                db.set(`money_${message.guild.id}_${user.id}`, 0)
                db.set(`killtime_${message.guild.id}_${author.id}`, Date.now())
            }else {
                db.set(`killtime_${message.guild.id}_${author.id}`, Date.now())
                return message.channel.send(`Failed :( You got number ${killchance} / 10000 but you needed 1 / 10000`)
            }
        }
    }

};

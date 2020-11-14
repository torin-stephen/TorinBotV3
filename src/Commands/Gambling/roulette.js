const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const fetch = require('node-fetch');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roulette',
            aliases: ['rl'],
            description: 'Play with the economy money',
            category: 'Gambling',
            usage: '$roulette <bet>'
        });
    }

    async run(message, args) {

        let bet = args[0]

        const user = message.author
        
        if (!bet) {
            return message.channel.send("No bet placed! Try: $roulette <bet>")
        };

        if (isNaN(bet)) return message.channel.send("That is not a number!");

        if (bet < 1) return message.channel.send("Cannot be negative!")

        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)
        if (member < bet) return message.channel.send("Not enough money!")

        let output = Math.floor(Math.random() * 3) + 1;

        db.subtract(`money_${message.guild.id}_${user.id}`, bet)

        if (output == 1) {
            let embed = new MessageEmbed()
                .setAuthor(`Roulette`, `${message.author.displayAvatarURL()}`)
                .setColor("GREEN")
                .addField(`You won: `, `${bet * 2}`)
            message.channel.send(embed)
            db.add(`money_${message.guild.id}_${user.id}`, bet * 2)
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`Roulette`, `${message.author.displayAvatarURL()}`)
                .setColor("RED")
                .addField(`You lost: `, `${bet}`)
            message.channel.send(embed)
        }
    }

};

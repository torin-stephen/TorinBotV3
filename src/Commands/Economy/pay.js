const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Pays user from your balance',
            category: 'Economy',
            usage: 'Usage: !pay @user [number]'
        });
    }

    async run(message, args) {
        let user = message.mentions.members.first()

        if (user === message.author) {
            return message.channel.send("You can't pay yourself!");
        };

        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)


        if (!user) {
            return message.channel.send('You forgot to mention somebody.')
        }
        if (!args[1]) {
            return message.channel.send('Please specify an amount.')
        }
        if (message.content.includes('-')) { // if the message includes "-" do this.
            return message.channel.send('Negative money can not be paid.')
        }

        if (member < args[1]) {
            return message.channel.send(`That's more money than you've got in your balance. try again.`)
        }

        message.channel.send(`${message.author.tag}, You successfully paid ${user.user.tag} $${args[1]}.`)
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
    }

};
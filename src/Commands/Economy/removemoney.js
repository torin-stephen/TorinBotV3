const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Removes money from mentioned',
            category: 'Owner',
            usage: 'Usage: !removemoney @user [number]'
        });
    };

    async run(message, args) {
        if (message.author.id !== '472417108148617246') {
            return message.reply('You do not have enough permission to use this command.');
        };
        
        let user = message.mentions.users.first();
        if (!user) return message.reply('Mention a user!');

        if (!args[1]) return message.reply('Please specify an amount to add.');
        if (isNaN(args[1])) return message.reply('That was not a valid number!');


        message.channel.send('Successfully removed ' + args[1] + ' from ' + user.tag);
        db.subtract(`money_${message.guild.id}_${user.id}`, args[1]);
    };

};
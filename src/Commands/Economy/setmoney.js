const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'sets money',
            category: 'Owner',
            usage: 'Usage: !setmoney @user [number]'
        });
    };

    async run(message, args) {
        if (!message.author.id == "472417108148617246") {
            return message.channel.send("You don't have enough permissions to run this command.");
        };
        const fmoney = parseFloat(args[1]);

        let user = message.mentions.users.first();
        if (!user) return message.reply('Mention a user!');

        if (!fmoney) return message.reply('Please specify an amount to set.');
        if (isNaN(fmoney)) return message.reply('That was not a valid number!');


        message.channel.send('Successfully set ' + user.tag + ' to ' + fmoney);
        
        db.set(`money_${message.guild.id}_${user.id}`, fmoney);
    };

};
const Discord = require('discord.js');

const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'poll',
            aliases: ['runpoll', 'ask'],
            description: 'Creates a poll',
            category: 'Utilities',
            usage: '$poll [question]'
        });
    }

    async run(message, args) {
        if (!args[0]) {
            return message.channel.send("Usage: $poll <poll question>")
        }
        let pollChannel = message.channel;
        let pollDescription = args.slice(0).join(' ');

        let embedPoll = new Discord.MessageEmbed()
            .setAuthor(`New Poll!`, `${message.author.displayAvatarURL()}`)
            .setDescription(pollDescription)
            .setColor('DARK_GREEN')
            .setFooter(`Poll by ${message.author.tag}`)
        pollChannel.send(embedPoll).then(embedPoll => {
            embedPoll.react('775081123284910090')
            embedPoll.react('775081123003760710')
        });
    }

};
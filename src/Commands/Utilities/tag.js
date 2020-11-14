const Command = require('../../Structures/Command.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'tag',
			aliases: ['addcmd', 'custom'],
			description: 'add custom guild commands, requires manage messages.',
			category: 'Utilities',
			usage: '$tag [cmdname] [cmdoutput]'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`:x: You need \`MANAGE_MESSAGES\` to run this command`)
        )

        let cmdname = args[0]

        if (!cmdname) {
            message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`:x: You have to give a command name, \`tag <cmd_name> <cmd_response>\``)
            )
        }

        let cmdresponse = args.slice(1).join(" ")

        if (cmdresponse == '') return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`:x: You have to give a command response, \`tag <cmd_name> <cmd_response>\``)
        )


        let database = db.get(`cmd_${message.guild.id}`)

        if (database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`:x: This tag already exists in this server.`)
        )

        let data = {
            name: cmdname.toLowerCase(),
            response: cmdresponse
        }

        db.push(`cmd_${message.guild.id}`, data)

        return message.channel.send(new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`:white_check_mark: Added tag **${cmdname.toLowerCase()}**`)
        )
    }

};

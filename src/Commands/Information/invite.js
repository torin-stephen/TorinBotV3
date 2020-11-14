const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'invite',
			aliases: ['invitelink'],
			description: 'Invite TorinBot to another server',
			category: 'Information',
			usage: '$invite'
		});
	}

	async run(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle('Invite link')
		.setURL('https://torinbot.tk')
		.setColor('PURPLE')
		.setThumbnail('https://torinbot.tk/logo2.png')
		.setDescription('Click the link above to invite **TorinBot** to another server.')
        message.channel.send(embed)
	}

};

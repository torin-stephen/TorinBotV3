const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['invitelink'],
			description: 'Invite TorinBot to another server',
			category: 'Information'
		});
	}

	async run(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle('Invite link')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=709337034204119101&permissions=8&scope=bot')
        message.channel.send(embed)
	}

};

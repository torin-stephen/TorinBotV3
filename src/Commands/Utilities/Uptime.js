const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'uptime',
			aliases: ['ut'],
			description: 'Shows how long the bot has been online',
			category: 'Utilities',
			usage: '$uptime'
		});
	}

	async run(message) {
		message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
	}

};

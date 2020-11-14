const Command = require('../Structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'hello',
			aliases: ['hallo'],
			description: 'Simple test command to see if the bot is responding.',
			usage: '$hello'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		message.channel.send('Hello!');
	}

};

const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'roll',
			aliases: ['dice', 'diceroll'],
			description: 'Rolls a dice',
			category: 'Utilities',
			usage: '$roll [number]'
		});
	}

	async run(message, args) {
		if (!args[0]) return message.channel.send("Usage: $roll <number>")
		message.channel.send(message.author.username + ' rolled a ' + (Math.round(Math.random() * (args[0] - 1) + 1)));
	}

};

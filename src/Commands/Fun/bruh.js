const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'bruh',
			aliases: ['bruhmoment'],
			description: 'bruh',
			category: 'Fun',
			usage: '$bruh'
		});
	}

	async run(message) {
        message.channel.send('Thats what I call a bruh moment');
	}

};

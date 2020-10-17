const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'bruh moment',
			category: 'Fun'
		});
	}

	async run(message) {
        message.channel.send('Thats what I call a bruh moment');
	}

};

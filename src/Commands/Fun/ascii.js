const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['banner'],
			description: 'Creates an ascii art of your text',
			usage: '$ascii <text-here>',
			category: 'Fun'
		});
	}

	async run(message, ...banner) {
			return message.channel.send(await figlet(banner), { code: true });
	}

};

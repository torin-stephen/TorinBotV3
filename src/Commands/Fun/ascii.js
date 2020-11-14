const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'ascii',
			aliases: ['banner'],
			description: 'Creates an ascii art of your text',
			usage: '$ascii <text-here>',
			category: 'Fun'
		});
	}

	async run(message, args) {
		if (!args[0]) return message.channel.send('Usage: $ascii <text-here>')

		const msg = args.join(" ");

		figlet.text(msg, function (err, data) {
			if (err) {
				console.log('Something went wrong');
				console.dir(err);
			}
			if (data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

			message.channel.send('```' + data + '```')
		})
	}

};

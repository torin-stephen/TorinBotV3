const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'ping',
			aliases: ['pong'],
			description: 'Check the ping for the bot and the API',
			category: 'Utilites',
			usage: '$ping'
		});
	}

	async run(message) {
		const msg = await message.channel.send('Pinging...');

		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
	}

};

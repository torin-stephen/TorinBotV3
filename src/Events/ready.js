const Event = require('../Structures/Event');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));

		const activities = [
			`$help | ${this.client.guilds.cache.size} servers!`,
			`$help | ${this.client.channels.cache.size} channels!`,
			`$help | ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) || `194178`} users!`,

		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 20000)
	}

};

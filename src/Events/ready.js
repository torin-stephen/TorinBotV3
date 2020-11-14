const Event = require('../Structures/Event');
const db = require('mongoose');
const config = require("../../config.json")
const DBL = require('dblapi.js');
const dbl = new DBL(config.dbltoken, this.client);


const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}


module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`,
			`Joined ${this.client.guilds.cache.size} servers!`,
			`Serving ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} people!`,
		].join('\n'));

		const activities = [
			`$help | ${this.client.guilds.cache.size} servers!`,
			`$help | ${this.client.channels.cache.size} channels!`,
			`$help | ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) || `194178`} users!`,

		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 20000)

		setInterval(() => {
			dbl.postStats(this.client.guilds.cache.size);
			console.log('Posted stats to DBL')
		}, 1800000);

		await db.connect(`mongodb+srv://${config.dbusername}:${config.dbpassword}@cluster0.vny6q.mongodb.net/torinbot?retryWrites=true&w=majority`, dbOptions)
			.then(console.log('MongoDB Active'))
	}

};



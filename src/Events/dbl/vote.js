const Event = require('../../Structures/Event');
const config = require("../../../config.json");
const DBL = require('dblapi.js');
const dbl = new DBL(config.dbltoken, this.client, { webhookPort: 5000, webhookAuth: 'password' });

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'vote',
			once: false,
			emitter: 'dbl.webhook'
		});
	}

	async run(vote) {
		console.log('User with ID ' + vote.user + ' voted!');
		const user = client.users.get(vote.user); // This will get the User Object from the Client#users Collection
		if (user) { // This checks if the Bot knows who the User is.
			user.send('Thank you for voting!'); // DM the User "Thank you for voting!"
		}
	}

};



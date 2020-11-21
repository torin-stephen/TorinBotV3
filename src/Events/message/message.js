const Event = require('../../Structures/Event');
const GuildSchema = require('../../schemas/Guild-schema');
const { globalprefix } = require('../../../config.json');
const quickdb = require('quick.db');

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		const dbresult = await GuildSchema.findOne({ guildId: message.guild.id })

		if (!dbresult) await GuildSchema.findOneAndUpdate({
			guildId: message.guild.id
		},
			{
				guildId: message.guild.id,
				prefix: '$',
			},
			{
				upsert: true,
			}
		);



		if (!message.guild || message.author.bot) return;

		
		const prefix = await dbresult.prefix

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${prefix}\`.`);

		/*const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
		*/
		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			command.run(message, args);
			console.log(`Command used: ${cmd}`)
		}

		let cmdx = quickdb.get(`cmd_${message.guild.id}`)

		if(cmdx) {
			let cmdy = cmdx.find(x => x.name === cmd)
			if(cmdy) message.channel.send(cmdy.response)
		}
	}

};
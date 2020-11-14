const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            name: 'slap',
            description: "slaps a member",
			category: "Actions",
			usage: '<@Name>'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message) {
		const mentionedMember = message.mentions.users.first();
		if (!mentionedMember) return message.channel.send(`You need to mention someone to slap!`)

		const slapgifs = [
			`https://media.giphy.com/media/vxvNnIYFcYqEE/source.gif`,
			`https://media.giphy.com/media/uG3lKkAuh53wc/source.gif`,
			`https://media.giphy.com/media/gSIz6gGLhguOY/source.gif`,
			`https://media.giphy.com/media/3XlEk2RxPS1m8/source.gif`,
			`https://media.giphy.com/media/u8maN0dMhVWPS/source.gif`
		]

		if (message.author.id === mentionedMember.id) return message.channel.send(`Why would you want to slap your self?`)
		
		const randomNumber = Math.floor(Math.random() * slapgifs.length)

		message.channel.send(
			new MessageEmbed()
				.setColor('RANDOM')
				.setImage(slapgifs[randomNumber])
				.setDescription(`${message.author.tag} slapped ${mentionedMember.tag}`) 
		)
	}

};

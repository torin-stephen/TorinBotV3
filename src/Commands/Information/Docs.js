const Command = require('../../Structures/Command.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            aliases: ['djs', 'discord.js', 'doc'],
            description: 'Displays information from the discord.js documentation.',
            category: 'Information',
            usage: '<search Query>'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`;
        
        const docFetch = await fetch(url);
        const embed = await docFetch.json();

        if (!embed || embed.error) {
            return message.reply(`"${args}" couldn't be located within the discord.js documentation.`);
        };

        if(!message.guild) {
            return message.channel.send({ embed });
        }

        const msg = await message.channel.send({ embed });
        msg.react('🗑️')

        let react;
        try {
            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                { max: 1, time: 10000, errors: ['time'] }
            )
        } catch (error) {
            msg.reactions.removeAll();
        }

        if (react && react.first()) msg.delete();

        return message;
	};

};

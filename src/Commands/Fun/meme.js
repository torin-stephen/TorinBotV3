const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'meme',
            aliases: ['memes'],
            description: 'Meme from r/memes',
            category: 'Fun',
            usage: '$meme'
        });
    }

    async run(message) {
        const Discord = require('discord.js');
        const client = new Discord.Client();
        const embed = new Discord.MessageEmbed()
        const got = require('got');
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })
    }
};

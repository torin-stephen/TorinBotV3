const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const subreddits = [
	'cursed',
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cursedimage'],
            description: 'Cursed images',
            category: 'Fun'
        });
    }

    async run(message) {
        const randomPuppy = require('random-puppy');
        const snekfetch = require('snekfetch');
        let reddit = [
            "cursedimages",
            "cursedimages",
            "cursedimages",
            "cursedimages",
            "cursedimages",
            "cursedimages",
            "cursedimages",
            "cursedcomments",
            "cursedcomments",
        ]
        let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)]


        randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'cursed.png'
                }]
            })
        })

    }
};

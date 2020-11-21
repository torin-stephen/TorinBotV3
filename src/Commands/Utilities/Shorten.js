const Command = require('../../Structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'shorten',
            aliases: ['url', 'short'],
            description: 'Shortens a url',
            category: 'Owner',
            usage: '$shorten <url>'
        });
    }

    async run(message, args) {
        if (message.author.id !== '472417108148617246') {
            return message.reply('You do not have permission to use this command.');
        };
        if (!args[0]) return message.channel.send("Usage: $shorten <url>")

        const body = { "longUrl": args[0] };

        console.log(JSON.stringify(body))
        fetch('http://ovre.tk/api/url/shorten', {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => message.channel.send(`Your short url is <${json.shortUrl}>`));
    }

};

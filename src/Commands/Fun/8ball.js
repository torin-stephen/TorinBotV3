const Command = require('../../Structures/Command');

const answers = [
    'As I see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again',
    'Don’t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most likely.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Signs point to yes',
    'Very doubtful.',
    'Without a doubt.',
    'Yes.',
    'Yes – definitely.',
    'You may rely on it.'
]
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'See your future!',
            category: 'Fun',
            usage: '8ball <question here>?'
		});
	}

	async run(message, ...question) {
        return message.reply (question.join(' ').endsWith('?') ?
            `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
            '🎱 That doesn\'t seem to be a question, please try again! (try it again using a question mark)')
	}

};

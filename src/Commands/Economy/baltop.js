const Command = require('../../Structures/Command');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

function getLeaderboard(page, per_page) {
    // Get all data not sorted
    const resp = db.all();

    // Sort from higher to lower
    let sortedresp = resp.sort((a, b) => (a.data < b.data) ? 1 : -1);

    /* Pagination: copy the code from last example */

    // RESULT
    console.log(sortedresp)
}

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['btop', 'moneytop'],
            description: 'Shows richest people!',
            category: 'Owner'
        });
    }

    async run(message, args) {
        if (message.author.id !== '472417108148617246') {
            return message.reply('You do not have permission to use this command.');
        };
        getLeaderboard();
    }

};




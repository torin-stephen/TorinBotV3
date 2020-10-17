const Command = require('../../Structures/Command');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const talkedRecently = new Set();


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Robs mentioned user',
            category: 'Economy'
        });
    }

    async run(message, args) {
        if (message.author.bot) return message.channel.send("This command cannot be used by a bot");

        let user = message.mentions.members.first()
        if (!user) {
            return message.channel.send('Sorry, you forgot to mention somebody.')
        }
        let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`) // fetch mentioned users balance


        let author = await db.fetch(`money_${message.guild.id}_${message.author.id}`) // fetch authors balance


        if (author < 250) { // if the authors balance is less than 250, return this.
            return message.channel.send(':x: You need atleast $250 to rob somebody.');
        };

        if (targetuser === await db.fetch(`money_${message.guild.id}_472417108148617246`)) { // If target is @Torin.#2640 ignore.
            return message.channel.send(":x: Unfortunately you cannot rob this person, due to their rank in the bots configuration.")
        };

        if (user === message.author) {
            return message.channel.send("You can't rob yourself!");
        };

        if (targetuser <= 200) { // if mentioned user has 200 or less, it will return this.
            return message.channel.send(`:x: ${user.user.username} does not have anything to rob.`);
        };

        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before getting typing this again. - " + message.author.username);
        } else {

            if (args[1] == "high" && targetuser < 15000) return message.channel.send("They don't have enough to be robbed greatly.")
            if (targetuser > 15000 && author > 8000) {
                if (args[1] == "high") {
                    let random = Math.floor(Math.random() * 2000) + 1; // random number 2000-1
                    let success = Math.floor(Math.random() * 5) + 1;
                    if (success >= 2) {
                        let embed = new Discord.MessageEmbed()
                            .setDescription(`Success! ${message.author} you robbed ${user} greatly and got away with $${random}!`)
                            .setColor("GREEN")
                            .setTimestamp()
                        message.channel.send(embed)
                        db.subtract(`money_${message.guild.id}_${user.id}`, random)
                        db.add(`money_${message.guild.id}_${message.author}`, random)
                    } else {
                        message.channel.send(`:x: You got caught! You lost $${random} for trying to steal high from someone.`)
                        db.subtract(`money_${message.guild.id}_${message.author}`, random)
                        db.add(`money_${message.guild.id}_${user.id}`, random)
                    }
                    return;
                }

            }
            let random = Math.floor(Math.random() * 200) + 1; // random number 200-1


            let success = Math.floor(Math.random() * 5) + 1;
            if (success >= 1) {
                let embed = new Discord.MessageEmbed()
                    .setDescription(`Success! ${message.author} you robbed ${user} and got away with $${random}!`)
                    .setColor("GREEN")
                    .setTimestamp()
                message.channel.send(embed)
                db.subtract(`money_${message.guild.id}_${user.id}`, random)
                db.add(`money_${message.guild.id}_${message.author}`, random)
            } else {
                message.channel.send(`:x: You got caught! You lost $${random} for trying to steal from someone.`)
                db.subtract(`money_${message.guild.id}_${message.author}`, random)
                db.add(`money_${message.guild.id}_${user.id}`, random)
            }


        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 60000);
    }
};

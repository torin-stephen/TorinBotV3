const { MessageEmbed, Guild } = require('discord.js');
const GuildSchema = require('../../schemas/Guild-schema');
const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['p'],
            usage: "$prefix [newprefix]",
            category: "Utilities"
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You need manage server permission to do this!");
        if (!args[0])
            return message.channel.send(
                new MessageEmbed()
                    .setColor('RED')
                    .setDescription('You need to specify a prefix.')
            )
        if (args[0].length > 3)
            return message.channel.send(
                new MessageEmbed()
                    .setColor('RED')
                    .setDescription('A prefix cannot be more than 3 characters.')
            );
        await GuildSchema.findOneAndUpdate({
            guildId: message.guild.id,
        },
            {
                guildId: message.guild.id,
                prefix: args[0],
            },
            {
                upsert: true
            });

        message.channel.send(
            new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Successfully set the prefix to ${args[0]}`))
    }
};

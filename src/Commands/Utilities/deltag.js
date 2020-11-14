const Command = require('../../Structures/Command.js');
const db = require("quick.db")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'deltag',
			aliases: ['delcmd', 'delcustom'],
			description: 'Delete a tag on this server.',
			category: 'Utilities',
			usage: '$deltag <tagname>'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setAuthor(`Tag`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`:x: You need \`MANAGE_MESSAGES\` to run this command`)
        )
        let cmdname = args[0]

        if (!cmdname) return message.channel.send(":x: Gimm me commmand name, `delcmd <cmd_name>`")

        let database = db.get(`cmd_${message.guild.id}`)

        if (database) {
            let data = database.find(x => x.name === cmdname.toLowerCase())

            if (!data) return message.channel.send(":x: Unable to find this command.")

            let value = database.indexOf(data)
            delete database[value]

            var filter = database.filter(x => {
                return x != null && x != ''
            })

            db.set(`cmd_${message.guild.id}`, filter)
            return message.channel.send(`Deleted the **${cmdname}** Command!`)


        } else {
            return message.channel.send(":x: Sorry but i am unable to find that command!")



        }
    }

};

const Command = require('../../Structures/Command.js');
const { Util } = require('discord.js')
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api')
const youtube = new YouTube('AIzaSyCf0ba-xsqDBvkgHh_Q5p8rukadhfBPy9s')  // API KEY
const queue = new Map()


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'music',
            aliases: ['m'],
            description: 'Command handler for music commands. Check usage',
            category: 'Music',
            usage: '$m [command] ex: $m play songname'
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        // defining the search arguments and queue for the server
        const searchString = args.slice(1).join(' ')
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : ''
        const serverQueue = queue.get(message.guild.id)

        // play command
        if (args[0] == 'play') {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) return message.channel.send("You need to be a voice channel.")
            const permissions = voiceChannel.permissionsFor(message.client.user)
            if (!permissions.has('CONNECT')) return message.channel.send("I don\'t have permissions to connect to this voice channel.")
            if (!permissions.has('SPEAK')) return message.channel.send("I don\'t have permissions to speak in this voice channel.")
            try {
                var video = await youtube.getVideoByID(url)
            } catch {
                try {
                    var videos = await youtube.searchVideos(searchString, 1)
                    var video = await youtube.getVideoByID(videos[0].id)
                } catch {
                    return message.channel.send("I could not find any search results")
                }
            }
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            }

            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                }
                queue.set(message.guild.id, queueConstruct)

                queueConstruct.songs.push(song)

                try {
                    var connection = await voiceChannel.join()
                    queueConstruct.connection = connection
                    play(message.guild, queueConstruct.songs[0])
                } catch (error) {
                    console.log(`There was an error connecting to the voice channel: ${error}`)
                    queue.delete(message.guild.id)
                    message.channel.send(`There was an error connecting to the voice channel: ${error}`)
                }
            } else {
                serverQueue.songs.push(song)
                return message.channel.send(`**${song.title}** has been added to the queue.`)
            }
            return undefined
        } else if (args[0] == 'stop') {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music.")
            if (!serverQueue) return message.channel.send("There is nothing playing.")
            serverQueue.songs = []
            serverQueue.connection.dispatcher.end()
            message.channel.send("I have stopped the music for you.")
            return undefined
        } else if (args[0] == 'skip') {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip a song.")
            if (!serverQueue) return message.channel.send("There is nothing playing")
            serverQueue.connection.dispatcher.end()
            message.channel.send("I have skipped a song!")
            return undefined
        } else if (args[0] == 'volume') {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to change the volume.")
            if (!serverQueue) return message.channel.send("There is nothing playing")
            if (!args[1]) return message.channel.send(`The volume is: **${serverQueue.volume}**`)
            if (isNaN(args[1])) return message.channel.send("That is not a number.")
            serverQueue.volume = args[1]
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
            message.channel.send(`Volume is now: **${args[1]}**`)
            return undefined
        } else if (args[0] == 'playing') {
            if (!serverQueue) return message.channel.send("There is nothing playing")
            message.channel.send(`Now playing: **${serverQueue.songs[0].title}**`)
            return undefined
        } else if (args[0] == 'queue') {
            if (!serverQueue) return message.channel.send("There is nothing playing")
            message.channel.send(`
    __**Song Queue:**__
    ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
    
    **Now Playing:** ${serverQueue.songs[0].title}
            `, { split: true })
            return undefined
        } else if (args[0] == 'pause') {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to pause a song.")
            if (!serverQueue) return message.channel.send("There is nothing playing")
            if (!serverQueue.playing) return message.channel.send("Music already paused.")
            serverQueue.playing = false
            serverQueue.connection.dispatcher.pause()
            message.channel.send("I have paused the music")
            return undefined
        } else if (args[0] == 'resume') {
            if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to resume a song.")
            if (!serverQueue) return message.channel.send("There is nothing playing")
            if (serverQueue.playing) return message.channel.send("Music already resumed.")
            serverQueue.playing = true
            serverQueue.connection.dispatcher.resume()
            message.channel.send("I have resumed the music")
            return undefined
        } else if (!args[0] || args[0] == 'help') {
            message.channel.send(`
    __**Commands:**__
    **$m play**
    **$m stop**
    **$m skip**
    **$m volume**
    **$m playing**
    **$m queue**
    **$m pause**
    **$m resume**
            `, { split: true })
        }
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift()
            play(guild, serverQueue.songs[0])
        })
        .on('error', error => {
            console.log(error)
        })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

    serverQueue.textChannel.send(`Started Playing: **${song.title}**`)
}
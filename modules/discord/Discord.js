const Discord       = require('discord.js')
const FS            = require('fs')

const Logger        = require('../utils/Logger')
const EmbedBuilder  = require('./EmbedBuilder')



const Config        = JSON.parse(FS.readFileSync('config.json', 'utf-8'))
const Bot           = new Discord.Client({
    intents: [ 
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS
    ],
    presence: {
        status: 'dnd'
    }
})


Bot.on('ready', () => {
    Logger.info(`Discord-Bot successfully connected to '${Bot.user.tag}'!`)
    if (Config.discord.guild === "") {
        Logger.warning("Discord Guild ID is not set! please set it with '.bot setguildid'.")
    }
})

Bot.on('message', (msg) => {
    var author  = msg.member,
        channel = msg.channel,
        content = msg.content,
        guild   = msg.guild

    
    if (author.id != Bot.user.id) {
        if (content.startsWith(Config.discord.prefix)) {
            msg.delete()

            var invoke = content.split(' ')[0].substring(Config.discord.prefix.length),
                args   = content.toString().split(' ').slice(1),
                found  = false

            Config.discord.modules.commands.forEach((cmd) => {
                var index = cmd.split(':')
                if (invoke === index[0]) {
                    var command = require(`./commands/${index[1]}`),
                        commandInfo = command.commandInfo
                    if (commandInfo.permissionLevel != "0") {
                        if (author.id in Config.discord.users && Config.discord.users[author.id] == commandInfo.permissionLevel) {
                            found = true
                            command.run(msg, args, Bot)
                        } else {
                            channel.send({ embeds: [ EmbedBuilder.build("No Permission!", "You dont have the Permission to run this Command!", "#e74c3c")]})
                        }
                    } else {
                        found = true
                        command.run(msg, args)
                    }
                }
            })
            if (!found) {
                channel.send({ embeds: [ EmbedBuilder.build("Command not found!", "The Command doest exist!", "#e74c3c") ]})
            }
        } else {
            if (Config.discord.modules.chatFilter.enabled) {
                if (Config.discord.modules.chatFilter.blockURLS && content.toString().includes("http://") || content.toString().includes("https://")) {
                    msg.delete()
                    channel.send({ embeds: [ EmbedBuilder.buildSimple("Dont post URLS!", "You are not allowed to post Links her!", "#e74c3c") ]})
                }

                Config.discord.modules.chatFilter.blockedWords.forEach(word => {
                    if (content.toString().includes(word)) {
                        msg.delete()
                        channel.send({ embeds: [ EmbedBuilder.buildSimple("Blocked Word in Sentence!", "The Sentence you sended contains a not allowed word!", "#e74c3c") ]})
                    }
                })
            }
        }
    }
})


Bot.login(Config.discord.token).catch(() => {
    Logger.error("Connection corrupted! Make sure the Discord Token is valid!")
    process.exit(1)
})
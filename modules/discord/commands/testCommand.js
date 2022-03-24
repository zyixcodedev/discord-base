//! cmd: bot

const Discord       = require('discord.js')
const EmbedBuilder  = require('../EmbedBuilder')

const FS            = require('fs')


module.exports = {
    commandInfo : {
        "permissionLevel": "0"
    },
    async run(msg, args, bot) {
        var author  = msg.member,
            channel = msg.channel,
            content = msg.content,
            guild   = msg.guild
    }
}

//! cmd: bot

const Discord       = require('discord.js')
const EmbedBuilder  = require('../EmbedBuilder')

const FS            = require('fs')



module.exports = {
    commandInfo : {
        "permissionLevel": "4"
    },
    async run(msg, args, bot) {
        var author  = msg.member,
            channel = msg.channel,
            content = msg.content,
            guild   = msg.guild
        if (args.length === 0) {
            channel.send({embeds: [EmbedBuilder.buildSimple("Usage: .bot", "``.bot setguildid`` - Set the Guild ID to this Server.\n``.bot info`` - Show Infos about the Bot.", "#f1c40f")]})
        } else {
            if (args[0] === "setguildid") {
                var Config = JSON.parse(FS.readFileSync('config.json', 'utf-8'))
                Config.discord.guild = guild.id
                FS.writeFileSync('config.json', JSON.stringify(Config, null, 4))
                channel.send({embeds: [EmbedBuilder.buildSimple("Successfully!", "Successfully updated the Guild ID in the Config! Restart the Bot to apply!", "#2ecc71")]})
            }
            if (args[0] === "info") {
                let days = Math.floor(bot.uptime / 86400000);
                let hours = Math.floor(bot.uptime / 3600000) % 24;
                let minutes = Math.floor(bot.uptime / 60000) % 60;
                let seconds = Math.floor(bot.uptime / 1000) % 60;
                channel.send({embeds: [EmbedBuilder.buildSimple("Bot Information", `Base: https://zyixcode.dev/projects/discord-base\nUptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, "#3498db")]})
            }
        }
    }
}
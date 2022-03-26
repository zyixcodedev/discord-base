//! cmd: bot

const Discord       = require('discord.js')
const EmbedBuilder  = require('../EmbedBuilder')

const FS            = require('fs')



module.exports = {
    commandInfo : {
        "permissionLevel": "4"
    },
    async run(msg, args, bot) {
        var Config = JSON.parse(FS.readFileSync('config.json', 'utf-8'))
        var author  = msg.member,
            channel = msg.channel,
            content = msg.content,
            guild   = msg.guild
        if (args.length === 0) {

            var p = Config.discord.prefix

            const _EMBEDCONTENT = {
                title: `Usage: ${p}bot`,
                content: 
                `
                ${p}bot setguildid - Set the Guild ID to this Server.\n
                ${p}bot info - Show Infos about the Bot.\n
                ${p}bot setprefix <prefix> - Set the command prefix.
                
                `,
                color: "#f1c40f"
            }
            channel.send({embeds: [EmbedBuilder.build(_EMBEDCONTENT.title, _EMBEDCONTENT.content, _EMBEDCONTENT.color)]})
        } else {
            if (args[0] === "setguildid") {
                Config.discord.guild = guild.id
                FS.writeFileSync('config.json', JSON.stringify(Config, null, 4))
                channel.send({embeds: [EmbedBuilder.build("Successfully!", "Successfully updated the Guild ID in the Config! Restart the Bot to apply!", "#2ecc71")]})
            }
            if (args[0] === "setprefix") {
                if (args[1]) {
                    Config.discord.prefix = args[1]
                    FS.writeFileSync('config.json', JSON.stringify(Config, null, 4))
                    channel.send({embeds: [EmbedBuilder.build("Successfully!", "Successfully updated the command prefix to '" + args[1] + "'! Restart the Bot to apply!", "#2ecc71")]})
                }
            } 
            if (args[0] === "info") {
                let days = Math.floor(bot.uptime / 86400000);
                let hours = Math.floor(bot.uptime / 3600000) % 24;
                let minutes = Math.floor(bot.uptime / 60000) % 60;
                let seconds = Math.floor(bot.uptime / 1000) % 60;
                channel.send({embeds: [EmbedBuilder.build("Bot Information", `Base: https://zyixcode.dev/projects/discord-base\nUptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, "#3498db")]})
            }
        }
    }
}
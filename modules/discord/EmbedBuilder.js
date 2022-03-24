const { MessageEmbed } = require('discord.js')



module.exports = {
    /**
     * 
     * @param {String} title Embed Title
     * @param {String} content Content of the Embed
     * @param {import('discord.js').HexColorString} color Color of the Embed
    */
    buildSimple(title, content, color) {
        var Embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(content)
        .setColor(color)
        .setFooter({
            text: "This Bot use the Discord.Js Bot Base by ZyixCode"
        })
        return Embed
    }
}
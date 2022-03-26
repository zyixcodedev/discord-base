const { MessageEmbed } = require('discord.js')



module.exports = {
    /**
     * 
     * @author ZyixCode
     * @since 26.03.2022
     * @description create a new message embed
     * 
     * @param {String} title tmbed Title
     * @param {String} content content of the embed
     * @param {import('discord.js').HexColorString} color Color of the embed
     * @param {URL} thumbnail thumbnail URL
     * @param {String} footer footer content
     * @param {import('discord.js').EmbedField} fields Fields
     * 
     * @returns {MessageEmbed} returns the builded MessageEmbed
    */
    build(title, content, color, thumbnail, footer, fields) {
        var Embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(content)
        .setColor(color)
        .setFooter({
            text: "This Bot use the Discord.Js Bot Base by ZyixCode"
        })

        if (thumbnail) Embed.setThumbnail(thumbnail)
        if (footer) Embed.setFooter(footer)
        if (fields) Embed.addField(fields)

        
        return Embed
    }


}
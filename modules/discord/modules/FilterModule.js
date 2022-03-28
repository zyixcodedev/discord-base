//! name: FilterModule
//! description: Discord chat filter


const { Bot, getModuleJson, getModuleEnabled } = require('../Discord')


Bot.on('message', (msg) => {
    var author  = msg.member,
        channel = msg.channel,
        content = msg.content,
        guild   = msg.guild
    console.log(getModuleEnabled(FilterModule))
})
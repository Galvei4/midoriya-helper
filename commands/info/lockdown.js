const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'lockdown',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        if(message.author.id !== "990737760111443999"){
            message.channel.send(`${message.author} você deve pertencer à staff para utilizar este comando! ❌`)
            return;
        }

        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: false })
        message.channel.send("Canal fechado com sucesso! ✅").then((msg) =>{
            msg.delete()
            message.delete()
        })

    }
}

const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`Espere um pouco...`)

        message.channel.send(`${message.author} 🏓 Pong! **${client.ws.ping}ms** || (${Math.floor(msg.createdAt - message.createdAt)}ms)`)
        msg.delete()

    }
}

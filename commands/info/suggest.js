const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'suggest',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const ideia = args.join(' ')

        if(!ideia){
            message.channel.send(`${message.author} você deve providenciar algum texto! ❌`)
            return;
        }

        const embed = new MessageEmbed()
        .setAuthor(`Nova ideia de ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL())
        .addField("Autor: ", message.author)
        .addField("Sugestão: ", ideia)
        .setTimestamp()
        .setColor("#2a603b")

        const ideiaChannel = client.channels.cache.get("1140281281742118950")
        ideiaChannel.send(embed)
        message.channel.send(`${message.author} ideia enviada com sucesso! ✅`)
    }
}

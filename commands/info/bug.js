const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'bug',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const bug = args.join(' ')

        if(!bug){
            message.channel.send(`${message.author} você deve providenciar algum texto! ❌`)
            return;
        }

        const embed = new MessageEmbed()
        .setAuthor(`Novo bug relatado de ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL())
        .addField("Autor: ", message.author)
        .addField("Bug Encontrado: ", bug)
        .setTimestamp()
        .setColor("#2a603b")

        const bugChannel = client.channels.cache.get("1140281281742118951")
        const bugLog = client.channels.cache.get("1140281282627129346")
        bugChannel.send(embed)
        bugLog.send(embed)
        message.channel.send(`${message.author} bug relatado com sucesso! A staff irá entrar em contacto consigo para pedir mais detalhes. ✅`)
    }
}

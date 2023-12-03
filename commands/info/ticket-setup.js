const { MessageEmbed, Discord } = require('discord.js')

module.exports = {
    name : 'ticket',
    category : 'util',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`)
        channel.setParent("1140281281742118945")

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        })
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        })

        

        const embed = new MessageEmbed()
        .setTitle("📩 Obrigado por contactar o suporte!")
        .setDescription("Utilize o modelo descrito em <#1140281281742118947>\nO suporte irá responder-lhe brevemente.")
        .setTimestamp()
        .setColor('#44AA99')

        const reactionMessage = await channel.send(message.author, embed)

        try{
            await reactionMessage.react("🔒")
            await reactionMessage.react("⛔")
        } catch(err) {
            channel.send("Error sending emojis!")
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
            { dispose: true }
          );
      
          collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
              case "🔒":
                channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                break;
              case "⛔":
                channel.send("Apagando este canal em 5 segundos...");
                setTimeout(() => channel.delete(), 5000);
                break;
            }
          });
      
          message.channel
            .send(`${message.author} O seu ticket foi aberto em ${channel}! ✅`)
            .then((msg) => {
              setTimeout(() => msg.delete(), 7000);
            })
            .catch((err) => {
              throw err;
            });
    }
}

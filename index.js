// Required Libraries
const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
require('dotenv').config()
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})

// Config
const config = require('./config.json')
const prefix = config.prefix
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

// Ready Event
client.on('ready', () => {
    client.user.setActivity(`Entre na Mansão do Midoriya! https://discord.gg/S2YxuNdKfp`)
    console.log(`${client.user.username} ready and up to go ✅`)
})

// Message Event and Command Handler
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
    message.delete()
})

// Guild Member Add Event
client.on('guildMemberAdd', member =>{
    // Welcome Message
    const chatChannel = member.guild.channels.cache.get("1140281281532412011")
    chatChannel.send(`<:midoriyaready:1180116931961946162> Olá ${member.user}! Bem-vindo à Mansão do Midoriya!\n- Consulte as <#1140281281532412006> para se integrar\n- Esteja atento ao <#1140286356816408596> para ver o status do <@1140231406014963782>\n\nE por fim, se divirta! <:midoriya27:1180116768979681301>`)

    // Auto Role
    const role = member.guild.roles.cache.find(role => role.id === "1140281281209450574");
    member.roles.add(role);

    // Log
    const logChannel = client.channels.cache.get("1140281282216083576")
    const logEmbed = new MessageEmbed()
    .setTitle(`Novo Membro`)
    .addField("User", member.user.tag)
    .setTimestamp()
    .setColor('#FFFFFF')

    logChannel.send(logEmbed)
})

// Guild Member Remove Event
client.on('guildMemberRemove', member => {
    const logChannel = client.channels.cache.get("1140281282216083576")
    const logEmbed = new MessageEmbed()
    .setTitle(`Membro Saiu`)
    .addField("User", member.user.tag)
    .setTimestamp()
    .setColor('#000000')

    logChannel.send(logEmbed)
})

// Deleted Message Log
client.on('messageDelete', async messageDeleted => {
    const logChannel = client.channels.cache.get("1140281282216083576")
    const logEmbed = new MessageEmbed()
    .setTitle(`Mensagem Apagada`)
    .addField("Canal", messageDeleted.channel)
    .addField("Conteúdo", `\`\`\`${messageDeleted}\`\`\``)
    .addField("Autor", messageDeleted.author)
    .setTimestamp()
    .setColor('#FF0000')

    logChannel.send(logEmbed)
})

// Edited Message Log
client.on('messageUpdate', async (oldMessage, newMessage) => {
    const logChannel = client.channels.cache.get("1140281282216083576")
    const logEmbed = new MessageEmbed()
    .setTitle(`Mensagem Editada`)
    .addField("Canal", oldMessage.channel)
    .addField("Antes", `\`\`\`${oldMessage}\`\`\``)
    .addField("Depois", `\`\`\`${newMessage}\`\`\``)
    .addField("Autor", oldMessage.author)
    .setTimestamp()
    .setColor('#FFFF00')

    logChannel.send(logEmbed)
})

// Login
client.login(process.env.TOKEN)

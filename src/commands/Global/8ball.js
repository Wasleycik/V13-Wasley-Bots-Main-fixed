const Discord  = require('discord.js');
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "8ball",
    aliases: ["8ball"],
    execute: async (client, message, args, embed, author, channel, guild) => {
const soru = args.join(' ')
   if (soru.length < 1) return message.reply('Cevaplamam için herhangi bir şey yazmalısın.');
let answers = [
        'Kesinlikle evet.',
        'Kesinlikle hayır.',
        'Sen bilirsin.',
        'Belki.',
        'Olumlu görünüyor.',
        `Olumlu görünmüyor.`,
        `Bunu beğendim.`,
        `Bunu beğenmedim.`,
        `Tekrar sor.`,
        `Bence hayır.`,
        `Bence evet.`,
        `Bilmiyorum.`,
        `Belki.`,
        `Karnım aç düşünemiyorum.`,
    ] 
    const BallNumber = Math.floor(Math.random() * answers.length); 
const discord = new Discord.MessageEmbed()
.setTitle(`${message.author.tag} || 8Ball`)
.setDescription(`**Soru :** \n  \`${soru}\` \n **Yanıtım :** \n \`${answers[BallNumber]}\``)
.setColor('AQUA')
.setThumbnail(message.author.avatarURL({dynamic: true}))
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
    
message.channel.send({embeds : [discord]})
}}
  
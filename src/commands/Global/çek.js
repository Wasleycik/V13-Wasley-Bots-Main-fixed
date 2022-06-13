
const ms = require("ms")
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
module.exports = {
    name: "çek",
    aliases:  ['çek'],
    execute: async (client, message, args, author, channel, guild) => {
        
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0], message.guild)
        if(!message.member.voice.channel) return message.reply("Bir kullanıcıyı sese çekmek için ilk önce senin ses kanallarında bulunmak gerekiyor!", message.author, message.channel)
        if(!user) return message.reply("Bir kullanıcıyı sese çekmek istiyorsan o kullanıcıyı belirtmen gerekir.", message.author, message.channel)
        if(!user.voice.channel) return message.reply("Etiketlediğin kullanıcı her hangi sesli bir kanalda bulunmuyor.", message.author, message.channel)
        if(!message.member.voice.channel === user.voice.channel) return message.reply("Etiketlediğiniz kullanıcı ile aynı sesli kanalda bulunuyorsunuz.", message.author, message.channel)
    //    if(message.member.roles.highest.rawPosition < user.roles.highest.rawPosition) return message.reply("Rolleri senden üst ve ya aynı olan kullanıcıları ses odalarında taşıyamazsın.", message.author, message.channel)
         if (user.id == message.author.id) return message.reply("Kullanıcılar kendilerine ceza-i işlem uygulayamaz.", message.author, message.channel)

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("GİT")
            .setLabel("GİT")
            .setStyle("SUCCESS"),
            new Discord.MessageButton()
            .setCustomId("GİTME")
            .setLabel("GİTME")
            .setStyle("PRIMARY"),
            new Discord.MessageButton()
            .setCustomId("İPTAL")
            .setLabel("İPTAL")
            .setStyle("DANGER")
        )

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
         .setColor("RANDOM")
        .setDescription(`
${user}, ${message.member} üyesi sizi ${message.member.voice.channel.name} adlı kanala çekmek istiyor kabul ediyor musun?
        `)
      
        let msg = await message.channel.send({ content: `${user}`, embeds: [embed], components: [row] })

        var filter = (button) => button.user.id === user.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
       
        collector.on("collect", async (button) => {
           
            if(button.customId === "GİT") {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                msg.edit({ components: [row] })

        message.guild.members.cache.get(user.id).voice.setChannel(message.member.voice.channel)
        button.reply(`Başarıyla ${message.member} kişisinin bulunduğu \`${message.member.voice.channel.name}\` isimli kanala gittiniz.`)
            
    } else if(button.customId === "GİTME") {
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(true)
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] })

        button.reply("Odaya çekilme işlemi reddedildi.")
    } else if(button.customId === "İPTAL") {
        button.reply("Odaya çekilme işlemi iptal edildi.")
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(true)
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] })

    }
        })

        collector.on("end", async (button) => {
            row.components[0].setDisabled(true)
            row.components[1].setDisabled(true)
            row.components[2].setDisabled(true)
            msg.edit({ components: [row] })

        })
        }
}
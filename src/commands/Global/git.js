const Discord = require("discord.js");

module.exports = {
  name: "git",
  aliases: ["git"],
  execute: async (client, message, args, embed, author, channel, guild) => {
        let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0], message.guild)
        if(!message.member.voice.channel) return message.reply("Bir kullanıcının odasına gitmek için ilk önce kendiniz ses kanalına girmelisiniz.", message.author, message.channel)
        if(!kullanici) return message.reply("Odasına gitmek istedğiniz kullanıcıyı belirtmeniz gerekir", message.author, message.channel)
        if(!kullanici.voice.channel) return message.reply("Odasına gitmek istediğiniz kullanıcı ses kanallarında bulunmuyor", message.author, message.channel)
        if(message.member.voice.channel.id === kullanici.voice.channel.id) return message.reply("Odasına gitmek istediğinizi kullanıcı ile aynı odada bulunuyorsunuz!", message.author, message.channel)
        if (kullanici.id == message.author.id) return message.reply("Kullanıcılar kendilerine ceza-i işlem uygulayamaz.", message.author, message.channel)

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("GİT")
            .setLabel("GELSİN")
            .setStyle("SUCCESS"),
            new Discord.MessageButton()
            .setCustomId("GİTME")
            .setLabel("GELMESİN")
            .setStyle("PRIMARY"),
            new Discord.MessageButton()
            .setCustomId("İPTAL")
            .setLabel("İPTAL")
            .setStyle("DANGER")
        )
       
        let teklif = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`
${kullanici}, ${message.author} adlı kullanıcı sizin sesli kanalınıza gelmek istiyor kabul ediyor musunuz?`)
        .setColor("RANDOM")
    
          let msg = await message.channel.send({ content: `${kullanici}`, embeds: [teklif], components: [row] })

        var filter = (button) => button.user.id === kullanici.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
       
        collector.on("collect", async (button) => {
           
            if(button.customId === "GİT") {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                msg.edit({ components: [row] })

        message.member.voice.setChannel(kullanici.voice.channel);
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
const { MessageEmbed } = require("discord.js");
const ms = require('ms');
const ayarlar = require('../../../config.json');
var prefix = ayarlar.bot.prefix
module.exports = {
    name: "hesaptara",
    aliases: ["hesap-tara"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(ayarlar.üstYönetim) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı.")]})
  let süre = args[0];
  let zaman = args[1];
  if(!süre || !zaman || zaman.includes('hafta') || zaman.includes('ay') || zaman !== "saniye" && zaman !== "sn" && zaman !== "ay" && zaman !== "dakika" && zaman !== "dk" && zaman !== "saat" && zaman !== "sa" && zaman !== "gün" && zaman !== "g" && zaman !== "yıl" && zaman !== "y") return message.reply(`Süre belirtmelisin! (Süre olarak ay veya hafta yazılamaz) **Örn:** \` 10 gün\``);
  let üyeler = message.guild.members.cache.filter(üye => !üye.user.bot && new Date().getTime() - üye.user.createdAt.getTime() < ms((süre+zaman).replace('saniye', 's').replace('sn', 's').replace('dakika', 'm').replace('dk', 'm').replace('saat', 'h').replace('sa', 'h').replace('gün', 'd').replace('g', 'd').replace('yıl', 'y')));
  message.channel.send({embeds: [new MessageEmbed() .setDescription(`**${süre} ${zaman}** süresinden az olan "${üyeler.size}" kullanıcı bulundu;
  **─────────────────────────────**
  ${üyeler.map(qwe => "<@" + qwe.user.id + "> **(**" + qwe.user.id + "**)**").join('\n')}
  
  `)]})
}}
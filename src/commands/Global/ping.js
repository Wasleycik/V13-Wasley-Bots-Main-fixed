const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../../config.json");
const db = require("quick.db"); 
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "ping",
    aliases: ["pong"],

    execute: async (client, message, args, embed, author, channel, guild) => {

if(!message.member.permissions.has("ADMINISTRATOR") && message.channel.id !== config.channels.botkomut) return message.reply({content: `Bu komutu Sadece <#${config.channels.botkomut}> kanalında kullanmalısın.`})
        message.reply({ embeds: [embed.setDescription(`Bot anlık ping: " ${client.ws.ping} ms"`)] });
      


    } 
}
const discord = require("discord.js"),
    moment = require("moment");
const config = require("../../../config.json")
module.exports = {
    name: "rol-bilgi",
    aliases: [],
    execute: async (client, message, args, author, channel, guild) => {
        if (!args[0]) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `}| You forgot to provide the role!`,
                        color: config.bot.renk
                    })
                ]
            })
        }
        message.channel.sendTyping()
        await message.guild.members.fetch();
        let role = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0])
            || await message.guild.roles.cache.find(r => r.name === args.join(" "));

        if (!role) {
            return message.reply({
                embeds: [
                    new discord.MessageEmbed({
                        description: `| You forgot to provide the valid role!`,
                        color: config.bot.renk
                    })
                ]
            })
        }
        let mem = role.members.map(m => m);
        if (role.members.size > 50) {
            mem = `Members Size Exceeds The Value OF [50]`
        }

        const embed = new discord.MessageEmbed({
            color: role.hexColor || config.bot.renk,
            title: `${role.name}'s Rolünün Bilgileri`,
            description: `**Rol ID : **${role.id}\n` +
                `**Rolün Adı : **${role.name}\n` +
                `**Rol bahsedilebilirmi : **${role.mentionable ? 'Yes' : 'No'}\n` +
                `**Rol rengi : **${role.hexColor || 'Default'}\n` +
                `**Rol Ayrı Ayrı Grüntülenebilirmi : **${role.hoist ? 'Yes' : 'No'}\n` +
                `**Rol pozisyonu : **${role.position}\n` +
                `**Roldeki Üyeler : **${role.members.size || '0'}\n` +
                `**Rol entegrasyonmu : **${role.managed ? 'Yes' : 'No'}\n` +
                `**Rol silinebilirmi : **${role.editable ? 'Yes' : 'No'}\n` +
                `**Rol Oluşturma Tarihi : **<t:${Math.round(moment.utc(role.createdTimestamp) / 1000)}:R>\n` +
                `**Rol ikon : **${role.iconURL() ? `Yes\n**Role Icon : **[Download Here](${role.iconURL({ format: 'png' })})` : "No"}\n` +
                `**Roldeki izinler : **\n\`'${role.permissions.toArray().join("', '") || "None"}'\`\n` +
                `**Üyeler : **\n${mem}`,
            footer: {
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            }
        })
            .setThumbnail(role.iconURL() || message.guild.iconURL({ dynamic: true }));
        return message.reply({ embeds: [embed] })
    }
};
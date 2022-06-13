const Discord = require("discord.js");
const { Snake } = require("discord-gamecord")
module.exports = {
    name: "snake",
    aliases: ["snake"],

    execute: async (client, message, args, embed, author, channel, guild) => {


new Snake({
        message: message,
        embed: {
        title: 'Yılan oyunu',
        color: 'AQUA',
        OverTitle: "Oyun bitti.",
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
          board: '⬛',
          food: '🍎',
          up: '⬆️',
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        othersMessage: 'Butonları kullanmak için oyunu sen başlatmalısın.',
      }).startGame();
  }}
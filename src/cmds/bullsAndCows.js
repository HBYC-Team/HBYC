const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { DjsBullsAndCows } = require('@hizollo/games');
const { bullsAndCows } = require('../data/GameStrings.json');
const config = require('../../config');

const {cmdHook} = require("../hooks");

const bullsAndCowsData = new SlashCommandBuilder()
  .setName("bullsandcows")
  .setDescription("遊玩一場猜 AB 遊戲！")
  .addStringOption(option =>
      option.setName("困難模式")
        .setDescription("決定是否開啟困難模式，預設為關閉")
        .setRequired(false)
        .addChoices(
         { name: "開啟", value: '開啟' }
        )
  );

module.exports = {
    data: bullsAndCowsData,

    async execute(interaction) {
      const hardMode = interaction.options.getString("困難模式") ? true : false;

      const game = new DjsBullsAndCows({
        hardMode: hardMode,
        source: interaction,
        players: [interaction.user],
        strings: bullsAndCows
      });

      await game.initialize();
      await game.start();
      await game.conclude();

      const cmdHookEmbed = new EmbedBuilder()
          .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
          .setColor(0x00bfff)
          .setDescription("Command: `/bullsandcows`")
          .addFields(
              { name: "User Tag", value: interaction.user.tag },
              { name: "User ID", value: interaction.user.id },
              { name: "Guild Name", value: interaction.guild.name },
              { name: "Guild ID", value: interaction.guild.id }
          )
          .setTimestamp()
          .setFooter({ text: 'Shard#1' });

      cmdHook.send({
          embeds: [cmdHookEmbed]
      }); 
  }
}
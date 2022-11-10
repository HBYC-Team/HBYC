const { SlashCommandBuilder } = require('@discordjs/builders');
const { DjsLightsUp } = require('@hizollo/games');
const { EmbedBuilder } = require('discord.js');

const { lightsUp } = require('../data/GameStrings.json');

const { cmdHook } = require('../utils/WebhookManager');

const lightsUpData = new SlashCommandBuilder()
  .setName('lightsup')
  .setDescription('遊玩一場點燈遊戲！')
  .addIntegerOption(option => option
    .setName('棋盤大小')
    .setDescription('欲遊玩的棋盤大小，請填入 1 至 5 的整數，預設為 5')
    .setMaxValue(5)
    .setMinValue(1)
    .setRequired(false)
  )

module.exports = {
  data: lightsUpData,

  async execute(interaction){
    const boardSize = interaction.options?.getInteger('棋盤大小');

    const game = new DjsLightsUp({
      source: interaction,
      players: [interaction.user],
      strings: lightsUp,
      boardSize: boardSize ?? 5
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/lightsup`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Size", value: boardSize?.toString() ?? 'default' }
      )
      .setTimestamp()

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}
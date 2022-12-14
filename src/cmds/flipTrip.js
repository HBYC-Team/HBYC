const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { DjsFlipTrip } = require('@hizollo/games');
const { flipTrip } = require('../data/GameStrings.json');

const { cmdHook } = require('../utils/WebhookManager');

const flipTripData = new SlashCommandBuilder()
  .setName("fliptrip")
  .setDescription("來玩一場 Flip trip 遊戲！")
  .addIntegerOption(option =>
    option.setName("棋盤數")
    .setDescription("棋盤數 (1~10 ， 1 最簡單， 10 最困難 )")
    .setMaxValue(10)
    .setMinValue(1)
    .setRequired(true)
  )


module.exports = {
  data: flipTripData,

  async execute(interaction){
    const size = interaction.options.getInteger("棋盤數");

    const game = new DjsFlipTrip({
      source: interaction,
      players: [interaction.user],
      boardSize: size,
      strings: flipTrip
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/fliptrip`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Argument", value: size.toString() }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}

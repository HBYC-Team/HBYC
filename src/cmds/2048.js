const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const { DjsTofe } = require('@hizollo/games');
const { tofe } = require('../data/GameStrings.json');

const { cmdHook } = require('../utils/WebhookManager');

const tofeData = new SlashCommandBuilder()
  .setName("2048")
  .setDescription("開始一場 2048 遊戲")
  .addStringOption(option => 
    option.setName("困難模式")
      .setDescription("決定是否開啟困難模式，預設為關閉")
      .setRequired(false)
      .addChoices(
        { name: "開啟", value: '開啟' }
      )
  );



module.exports = {
  data: tofeData,
  
  async execute(interaction) {
    const hardMode = interaction.options.getString("困難模式") ? true : false;

    const game = new DjsTofe({
      hardMode: hardMode,
      source: interaction, 
      players: [interaction.user],
      strings: tofe
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/2048`")
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

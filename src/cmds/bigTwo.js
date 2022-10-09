const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { DjsBigTwo } = require('@hizollo/games');
const { bigTwo } = require('../GameStrings.json');

require('dotenv').config();

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
  id: cmdHookId,
  token: cmdHookToken
});

const bigTwoData = new SlashCommandBuilder()
  .setName("bigtwo")
  .setDescription("開啟一場大老二撲克牌遊戲")
  .addUserOption(option =>
    option.setName("p2")
        .setDescription("玩家2")
      .setRequired(true))
  .addUserOption(option =>
    option.setName("p3")
      .setDescription("玩家3")
      .setRequired(true))
  .addUserOption(option =>
    option.setName("p4")
      .setDescription("玩家4")
      .setRequired(true))

module.exports = {
  data: bigTwoData,
  
  async execute(interaction) {
    const p1 = interaction.user;
    const p2 = interaction.options.getUser("p2");
    const p3 = interaction.options.getUser("p3");
    const p4 = interaction.options.getUser("p4");

    if(p2.bot || p3.bot || p4.bot){
      await interaction.reply({ content: "機器人們不會玩大老二啦，他們都太爛了", ephemeral: true });
      return;
    }

    const game = new DjsBigTwo({
        source: interaction, 
        players: [p1, p2, p3, p4],
        strings: bigTwo 
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/bigtwo`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Players", value: `${p1.tag}, ${p2.tag}, ${p3.tag}, ${p4.tag}`}
      )
      .setTimestamp()
      .setFooter({ text: "Shard#1" });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}

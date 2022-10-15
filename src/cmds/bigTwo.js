const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { DjsBigTwo } = require('@hizollo/games');
const { bigTwo } = require('../data/GameStrings.json');
const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
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
    const user = interaction.user;
    const p2 = interaction.options.getUser("p2");
    const p3 = interaction.options.getUser("p3");
    const p4 = interaction.options.getUser("p4");

    if(p2.bot || p3.bot || p4.bot){
      await interaction.reply({ content: "機器人們不會玩大老二啦，他們都太爛了", ephemeral: true });
      return;
    }

    if(user.id === p2.id || user.id === p3.id || user.id === p4.id){
      await interaction.reply({ content: "可惜你沒朋友，只能跟自己玩，沒人陪你哈哈哈，那乾脆不要玩啦！", ephemeral: true });
      return;
    }

    const game = new DjsBigTwo({
        source: interaction, 
        players: [user, p2, p3, p4],
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

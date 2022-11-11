const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { bot } = require('../constants.json');

const ann = require('../data/latestUpdate');
const { cmdHook } = require('../utils/WebhookManager');

const announcementData = new SlashCommandBuilder()
  .setName("announcement")
  .setDescription("目前最新版本的公告")

module.exports = {
  data: announcementData,

  async execute(interaction){
    const annEmbed = new EmbedBuilder()
      .setColor(0x1cb7ca)
      .setTitle(`最新版本公告 - ${bot.version}`)
      .addFields(
        { name: "使用者方面", value: ann.userUpdate },
        { name: "專案庫方面", value: ann.devUpdate }
      )
      .setTimestamp()
      .setFooter({ text: "更詳細的內容請到 Github 上查看喔！" });

    await interaction.reply({ embeds: [annEmbed] });
    
    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/announcement`")
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

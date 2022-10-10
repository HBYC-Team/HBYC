const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { bot } = require('../constants.json');

const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
});

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
        { name: ">> 使用者方面", value: "+ </say:> 指令再也不能夠 @everyone 或 @here 了\n+ 重新整理並修復整份機器人存在的 bug\n+ 若是遊戲指令的參數錯誤，機器人會回應你一些話\n+ 修改使用者條款中的一些錯誤字詞" },
        { name: ">> 專案庫方面", value: "+ 移動整份專案至新的 repository\n+ Clean up 整份專案，進行大量 refactor\n+ 新的 banner\n+ 將 License 的部份重新闡述\n+ 改用 yarn 作為套件管理" }
      )
      .setTimestamp()
      .setFooter({ text: "更詳細的內容請到Github上查看喔！" });

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

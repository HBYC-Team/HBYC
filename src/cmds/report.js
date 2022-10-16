const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { supportGuild } = require('../constants.json');
const config = require('../../config');

const reportHook = new WebhookClient({
  id: config.reportHook.id,
  token: config.reportHook.token
});

const reportData = new SlashCommandBuilder()
  .setName("report")
  .setDescription("回報錯誤或建議給後台伺服器")
  .addStringOption(option =>
    option.setName("回報類型")
    .setDescription("是建議還是錯誤回報？")
    .addChoices(
      { name: "錯誤回報", value: "錯誤回報" },
      { name: "建議事項", value: "建議事項" }
    )
    .setRequired(true)
  )
  .addStringOption(option => 
    option.setName("內容")
      .setDescription("回報內容")
      .setRequired(true)
  );
  

module.exports = {
  data: reportData,

  async execute(interaction) {
    const content = interaction.options.getString("內容");
    const type = interaction.options.getString("回報類型");

    const replyEmbed = new EmbedBuilder()
      .setColor(0x4b56a8)
      .setTitle("用戶回報")
      .addFields(
        { name: "用戶名稱", value: `${interaction.user.tag}` },
        { name: "ID", value: `${interaction.user.id}` },
        { name: "回報類型", value: type },
        { name: "回報內容", value: `\`${content}\`` },
        { name: "回報伺服器", value: `${interaction.guild.name} (ID:${interaction.guild.id})` }
      ) 
      .setTimestamp()
      .setThumbnail(interaction.user.avatarURL())
      .setFooter({ text: `你的訊息已經回報至後台`, iconURL: interaction.client.user.avatarURL() });

    await interaction.reply({ embeds: [replyEmbed] });
    await interaction.user.send(`您的回報內容已經送至後台，請稍待團隊成員進行聯絡，也可以加入這裡進行發問：${supportGuild.invite}`);

    const color = (() => {
      if(type === "錯誤回報"){
        return 0xff0000;
      } else if(type === "建議事項"){
        return 0x0090ff;
      }
    })();

    const reportHookEmbed = new EmbedBuilder()
      .setColor(color)
      .setTitle("用戶回報")
      .addFields(
        { name: "用戶名稱", value: `${interaction.user.tag}` },
        { name: "ID", value: `${interaction.user.id}` },
        { name: "回報類型", value: type },
        { name: "回報伺服器", value: `${interaction.guild.name} (ID:${interaction.guild.id})` },
        { name: "回報內容", value: `\`${content}\`` }
      ) 
      .setTimestamp()
      .setFooter({ text: "Shard#5" });
    
    reportHook.send({
      embeds: [reportHookEmbed]
    });
  }
}

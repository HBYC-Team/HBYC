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
        { name: ">> 使用者方面", value: "+ 解決 </buttonrole:1009671086952169483> 的按鈕在一段時間後就會失效的狀況\n + </buttonrole:1009671086952169483> 如果使用者或機器人權限不足將會直接回應" },
        { name: ">> 專案庫方面", value: "+ 將 `deploy.js` 重新彙整，現在可以註冊私人測試指令了\n+ 當有人觸發交互 console 皆會 log ，以彌補機器人會常常重啟 (cycling 的關係 ) 的問題" }
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

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { links } = require('../constants.json');

const { cmdHook } = require('../utils/WebhookManager');

const githubData = new SlashCommandBuilder()
  .setName("github")
  .setDescription("取得HBYC原始碼的網址")


module.exports = {
  data: githubData,

  async execute(interaction){
    const githubEmbed = new EmbedBuilder()
      .setColor(0x000000)
      .setTitle("HBYC 的 Github 相關資訊")
      .addFields(
        { name: "目前版本", value: links.source },
        { name: "舊版本", value: links.old_source }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: "有一些特定內容的訊息會有隱藏回覆！試試看輸入 爛bot" })
            
    await interaction.reply({ embeds: [githubEmbed] });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/github`")
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

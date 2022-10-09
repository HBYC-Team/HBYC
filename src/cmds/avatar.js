const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');

require('dotenv').config();

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
  id: cmdHookId,
  token: cmdHookToken
});

const avatarData = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("取得一個用戶的頭像")
  .addUserOption(option =>
    option.setName("用戶名稱")
    .setDescription("用戶")
    .setRequired(false)
  )

module.exports = {
  data: avatarData,
  
  async execute(interaction){
    const member = (() => {
      if(interaction.options.getUser("用戶名稱") === null){
        return interaction.user;
      } else {
        return interaction.options.getUser("用戶名稱");
      };
    })();

    const description = (() => {
      if(member === interaction.user){
        return `<@!${interaction.user.id}>，以下是你的頭像：`;
      } else {
        return `<@!${interaction.user.id}>，這是你要查看的頭像：\n ${member.tag}的頭像`;
      }
    })();

    const avatar = member.displayAvatarURL({ format: "png", size: 1024 });
    
    const avatarEmbed = new EmbedBuilder()
      .setColor(0x00af2a)
      .setTitle("查看頭像")
      .setDescription(description)
      .setImage(avatar)
      .setTimestamp()
      .setFooter({ text: interaction.user.tag });
    
    await interaction.reply({ embeds: [avatarEmbed] });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/avatar`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Argument", value: member.tag }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}
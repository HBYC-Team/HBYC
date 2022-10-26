const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { devTeam } = require('../constants.json');

const { cmdHook } = require('../utils/WebhookManager');

const devData = new SlashCommandBuilder()
  .setName("dev")
  .setDescription("有關創作者的資訊")


module.exports = {
  data: devData,

  async execute(interaction){
    const devEmbed = new EmbedBuilder()
      .setTitle("HBYC的創作者")
      .setColor(0x756452)
      .addFields(
        { name: "團隊成員", value: devTeam.members },
        { name: "程式設計", value: devTeam.programTeam },
        { name: "網管控制", value: devTeam.internetTeam },
        { name: "美術設計", value: devTeam.artTeam }

      )
      .setTimestamp()
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: `HBYC Team (C) 2022` })

    await interaction.reply({ embeds: [devEmbed] });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/dev`")
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

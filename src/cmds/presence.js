const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { presence } = require('../config.json');
const config = require('../../config');

const {cmdHook} = require("../hooks");

const presenceData = new SlashCommandBuilder()
  .setName("presence")
  .setDescription("更改目前機器人的動態")

module.exports = {
  data: presenceData,

  async execute(interaction){
    let statusItem = Math.floor(Math.random()*presence.length);
    let status = presence[statusItem];

    await interaction.client.user.setPresence({ activities: [{ name: status }] });
    await interaction.reply(`<@!${interaction.user.id}>，已經將動態更改為\`${status}\`，5分鐘後可以再次使用這個指令！`);
    
    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/presence`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Now's Presence", value: status }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}
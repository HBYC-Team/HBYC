const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');

require('dotenv').config();

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
  id: cmdHookId,
  token: cmdHookToken
});

const echoData = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("讓HBYC重複一句話")
  .addStringOption(option => 
    option.setName("訊息內容")
      .setDescription("要讓機器人重複的話")
      .setRequired(true)
  )
  

module.exports = {
  data: echoData,

  async execute(interaction) {
    const content = interaction.options.getString("訊息內容");
    await interaction.reply(content);

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/echo`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Argument", value: content }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}
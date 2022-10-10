const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
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

    if(content === '@everyone' || content === 'here'){
      await interaction.reply({ content: '還想 @everone 啊，你是吃了熊心豹子膽嗎？', ephemeral: true });
      return;
    }

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
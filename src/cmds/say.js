const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
});

const sayData = new SlashCommandBuilder()
  .setName("say")
  .setDescription("讓HBYC發送一則訊息")
  .addStringOption(option => 
    option.setName("訊息內容")
      .setDescription("要發送的訊息內容")
      .setRequired(true)
  );

module.exports = {
  data: sayData,
  
  async execute(interaction) {
    const content = interaction.options.getString("訊息內容"); 

    if(content === '@everyone'){
      await interaction.reply({ content: '還想 @everone 啊，你是吃了熊心豹子膽嗎？', ephemeral: true });
      return;
    }
    
    await interaction.reply({ content: "訊息已傳送", ephemeral: true });
    await interaction.channel.send({ content: content, allowedMentions: { parse: [] } });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/say`")
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

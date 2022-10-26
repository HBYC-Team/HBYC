const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const { cmdHook } = require('../utils/WebhookManager');

const pingData = new SlashCommandBuilder()
  .setName("ping")
  .setDescription('揍我一拳看看我多久會回擊');

module.exports = {
  data: pingData,
  async execute(interaction) {
    let p = Math.round(interaction.client.ws.ping);
    
    const replyEmbed = new EmbedBuilder()
      .setColor(0xffbc00)
      .setTitle("HBYC目前的跑速")
      .addFields({ name: "API延遲", value: `${p}(ms)` })
      .setThumbnail(interaction.client.user.avatarURL())
      .setTimestamp()
      .setFooter({ text: "大膽刁民竟敢揍我，你完蛋了" });

    await interaction.reply({ embeds: [replyEmbed] });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/ping`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Ping", value: `${p}(ms)` }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}

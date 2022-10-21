const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { DjsFinalCode } = require('@hizollo/games');
const { finalCode } = require('../data/GameStrings.json');
const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
});

const finalCodeData = new SlashCommandBuilder()
  .setName("finalcode")
  .setDescription("遊玩一場猜終極密碼的遊戲")
  .addUserOption(option => 
    option.setName("p2")
    .setDescription("玩家2")
    .setRequired(false)
  )
  .addUserOption(option => 
    option.setName("p3")
    .setDescription("玩家3")
    .setRequired(false)
  )
  .addUserOption(option => 
    option.setName("p4")
    .setDescription("玩家4")
    .setRequired(false)
  )
  .addUserOption(option => 
    option.setName("p5")
    .setDescription("玩家5")
    .setRequired(false)
  )


module.exports = {
  data: finalCodeData,

  async execute(interaction) {
    const user = interaction.user;
    const p2 = interaction.options.getUser("p2");
    const p3 = interaction.options.getUser("p3");
    const p4 = interaction.options.getUser("p4");
    const p5 = interaction.options.getUser("p5");
  
    const players = [user, p2, p3, p4, p5].filter(v => v !== null);

    const game = new DjsFinalCode({
      source: interaction,
      players: players,
      strings: finalCode
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/finalcode`")
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


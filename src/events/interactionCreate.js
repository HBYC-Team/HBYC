const { InteractionType, EmbedBuilder, WebhookClient } = require('discord.js');
const { banList } = require('../data/banList.json');
const { errors } = require('../config.json');
const config = require('../../config');

const errHook = new WebhookClient({
  id: config.errHook.id,
  token: config.errHook.token
});

module.exports = {
  name: "interactionCreate",

  async execute(interaction){
    if(!interaction.type === InteractionType.ApplicationCommand) return;
    if(banList.includes(interaction.user.id)) return;
    if(interaction.guild === null) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return;

    try {
      await command.execute(interaction);
    } catch(error){
      await interaction.user.send(errors.interactionErr);

      const errHookEmbed = new EmbedBuilder()
        .setTitle(`Error Log - /${interaction.commandName}`)
        .setColor(0xff0000)
        .addFields(
          { name: 'Error Code', value: error.message },
          { name: "User Tag", value: interaction.user.tag },
          { name: "User ID", value: interaction.user.id },
          { name: "Guild", value: interaction.guild.name },
          { name: "Guild ID", value: interaction.guild.id }
        ) 
        .setTimestamp()
        .setFooter({ text: `Shard#4` });

      errHook.send({
        embeds: [errHookEmbed]
      });
    }
  }
}
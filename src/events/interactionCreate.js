const { EmbedBuilder, WebhookClient } = require('discord.js');
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
    if(banList.includes(interaction.user.id)) return;
    if(!interaction.guild) return;
    
    if(interaction.isChatInputCommand()){
      const command = interaction.client.commands.get(interaction.commandName);

      if(!command) return;

      try {
        await command.execute(interaction);
      } catch(error){
        if(error.message === 'Missing Permissions'){
          await interaction.channel.send('給我這些權限根本就不夠正常使用啊 ...');
          return;
        }

        if(error.message === 'Duplicated ids are not allowed.'){
          await interaction.channel.send('我要把你沒朋友的事實公諸於世，沒人陪你玩遊戲哈哈哈')
          return;
        }
        
        await interaction.user.send(errors.interactionErr);

        const errHookEmbed = new EmbedBuilder()
          .setAuthor({ name: `Error Log - /${interaction.commandName}`, iconURL: interaction.client.user.avatarURL() })
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

    if(interaction.isButton()){
      if(interaction.customId.includes('AsButtonRole')){
        const roleId = interaction.customId.replace(/AsButtonRole/, '');
        
        try {
          if(interaction.member?.roles.cache.has(roleId)){
            await interaction.member?.roles.remove(roleId);
            await interaction.reply({ content: `已幫你移除 <@&${roleId}> 身份組`, ephemeral: true });
          } else {
            await interaction.member?.roles.add(roleId);
            await interaction.reply({ content: `已幫你加上 <@&${roleId}> 身份組`, ephemeral: true });
          }
        } catch(e){
          const errHookEmbed = new EmbedBuilder()
            .setAuthor({ name: "Error Log", iconURL: interaction.client.user.avatarURL() })
            .setColor(0xff0000)
            .setDescription("Command: `/buttonrole <interaction>`")
            .addFields(
              { name: 'Error Code', value: error.message },
              { name: "User Tag", value: interaction.user.tag },
              { name: "User ID", value: interaction.user.id },
              { name: "Guild Name", value: interaction.guild.name },
              { name: "Guild ID", value: interaction.guild.id }
            )
            .setTimestamp()
            .setFooter({ text: 'Shard#4' });

          errHook.send({
            embeds: [errHookEmbed]
          });
        }
      }
    }
  }
}
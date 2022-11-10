// This is a private command that can send the message to the channel.
const { SlashCommandBuilder } = require('@discordjs/builders');

const { bot, supportGuild, devGuild } = require('../constants.json');
const config = require('../../config');
const ann = require('../data/latestUpdate');

const updateAnnData = new SlashCommandBuilder()
  .setName('sendann')
  .setDescription('更新最新版本的公告')

module.exports = {
  data: updateAnnData,

  async execute(interaction){
    try {
      const guild = interaction.client.guilds.cache.get(devGuild.id);

      if(guild){
        channel = guild.channels.cache.get(supportGuild.annChannelId);
        if(channel){
          channel.send(`<@&${supportGuild.roles.updateMentionId}> <@${config.bot.id}> ${bot.version} 已經發布！\n**更新內容如下**${ann.supportGuildAnn}`);
        }
        await interaction.reply('公告訊息已傳送');
      }
    } catch(e){
      console.error(e);
    }
  }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { selectPrefix } = require('../config.json');
const config = require('../../config');

const {cmdHook} = require("../hooks");

const selectData = new SlashCommandBuilder()
  .setName("select")
  .setDescription("讓HBYC幫你解決選擇困難症")
  .addStringOption(option =>
    option.setName("選項1")
    .setDescription("選項1")
    .setRequired(true)
  )
  .addStringOption(option =>
    option.setName("選項2")
    .setDescription("選項2")
    .setRequired(true)
  )
  .addStringOption(option =>
    option.setName("選項3")
    .setDescription("選項3")
    .setRequired(false)
  )
  .addStringOption(option =>
    option.setName("選項4")
    .setDescription("選項4")
    .setRequired(false)
  )
  .addStringOption(option =>
    option.setName("選項5")
    .setDescription("選項5")
    .setRequired(false)
  )


module.exports = {
  data: selectData,

  async execute(interaction){
    const c1 = interaction.options.getString("選項1");
    const c2 = interaction.options.getString("選項2");
    const c3 = interaction.options.getString("選項3");
    const c4 = interaction.options.getString("選項4");
    const c5 = interaction.options.getString("選項5");

    const choices = [c1, c2];

    if(c3 !== null){
      choices.push(c3);
    }

    if(c4 !== null){
      choices.push(c4);
    }

    if(c5 !== null){
      choices.push(c5);
    }


    let prefixItem = Math.floor(Math.random()*selectPrefix.length);
    let replyPrefix = selectPrefix[prefixItem];
      
    let randomItem = Math.floor(Math.random()*choices.length);
    let decision = choices[randomItem];

    if(replyPrefix === "我的決定是" || replyPrefix === "我選" || replyPrefix ==="我覺得是"){
      await interaction.reply(`${replyPrefix} ${decision}`);
    } else {
      await interaction.reply(`${decision} ${replyPrefix}`);
    }

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/select`")
      .addFields(
        { name: "User Tag", value: interaction.user.tag },
        { name: "User ID", value: interaction.user.id },
        { name: "Guild Name", value: interaction.guild.name },
        { name: "Guild ID", value: interaction.guild.id },
        { name: "Argument", value: `${choices}` }
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });

    cmdHook.send({
      embeds: [cmdHookEmbed]
    });
  }
}

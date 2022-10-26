const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Role: role } = require('discord.js');

const { cmdHook } = require('../utils/WebhookManager');

const buttonRoleData = new SlashCommandBuilder()
  .setName("buttonrole")
  .setDescription("藉由按按鈕的方式領取身份組！")
  .addRoleOption(option =>
    option.setName("身份組")
      .setDescription("填入你要用的身份組")
      .setRequired(true)
  )
  .addStringOption(option => 
    option.setName("介紹")
      .setDescription("介紹一下身份組是幹嘛的吧")
      .setRequired(true)
  )
  /*.addStringOption(option =>
    option.setName("表情")
      .setDescription("欲使用的表情符號")
  )*/
  .addStringOption(option =>
    option.setName("顏色")
      .setDescription("按鈕的顏色（非必填）")
      .setRequired(false)
      .addChoices(
        { name: "紅色", value: "紅色" },
        { name: "綠色", value: "綠色" },
        { name: "灰色", value: "灰色" },
        { name: "藍色", value: "藍色" }
      )
  )

module.exports = {
  data: buttonRoleData,

  async execute(interaction){
    const optionRole = interaction.options.getRole("身份組");
    //const emoji = interaction.options.getString("表情符號");
    const roleDescription = interaction.options.getString("介紹");
    const optionColor = interaction.options.getString("顏色");

    if(interaction.user.id !== interaction.guild?.ownerId && interaction.member?.roles.highest.comparePositionTo(optionRole) <= 0){
      await interaction.reply({ content: '沒權限還想管理身份組啊？沒門！', ephemeral: true });
      return;
    }

    if(!optionRole?.editable){
      await interaction.reply({ content: '我沒權限管理這個身份組啦！給我權限我才能管理 = =', ephemeral: true });
      return;
    }

    const color = (() => {
      if(optionColor === "紅色"){
        return ButtonStyle.Danger;
      } else if(optionColor === "綠色"){
        return ButtonStyle.Success;
      } else if(optionColor === "灰色"){
        return ButtonStyle.Secondary;
      } else /*藍色*/{
        return ButtonStyle.Primary;
      }
    })();

    const roleButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`${optionRole.id}AsButtonRole`)
          .setLabel(optionRole.name)
          .setStyle(color)
          //.setEmoji(emoji.id)
      );
    
    await interaction.reply({ content: `已經建立 <@&${optionRole.id}> 的按鈕身份組！`, ephemeral: true });
    await interaction.channel.send({ content: `**請點擊以下按鈕取得或移除身份組！**\n--\n<@&${optionRole.id}> : ${roleDescription}`, components: [roleButton], allowedMentions: { parse: [] } });
  
    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/announcement`")
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

const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder } = require("discord.js");

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

  async execute(interaction, ButtonInteraction){
    const role = interaction.options.getRole("身份組");
    //const emoji = interaction.options.getString("表情符號");
    const roleDescription = interaction.options.getString("介紹");
    const optionColor = interaction.options.getString("顏色");

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
          .setCustomId("buttonRole")
          .setLabel(role.name)
          .setStyle(color)
          //.setEmoji(emoji.id)
      );
    
    await interaction.reply({ content: `已經建立 <@&${role.id}> 的按鈕身份組！`, ephemeral: true });
    await interaction.channel.send({ content: `**請點擊以下按鈕取得身份組！**\n--\n<@&${role.id}>: ${roleDescription}`, components: [roleButton], allowedMentions: { parse: [] } });

    /***** Collecting Button Clicks *****/
    const fliter = bi => bi.member === ButtonInteraction.member;

    const collector = interaction.channel.createMessageComponentCollector(fliter, { max: Infinity });
    
    collector.on('collect', async bi => {
      if(bi.customId === 'buttonRole'){
        try {
          if(bi.member?.roles.cache.has(role.id)){
            await bi.member?.roles.remove(role.id);
            return bi.reply({ content: `已幫你移除 <@&${role.id}> 身份組`, ephemeral: true });
          } else {
            await bi.member?.roles.add(role.id);
            return bi.reply({ content: `已幫你加上 <@&${role.id}> 身份組`, ephemeral: true });
          }
        } catch(e){
          const errHookEmbed = new EmbedBuilder()
              .setAuthor({ name: "Error Log", iconURL: interaction.client.user.avatarURL() })
              .setColor(0x00bfff)
              .setDescription("Command: `/buttonrole`")
              .addFields(
                { name: "User Tag", value: interaction.user.tag },
                { name: "User ID", value: interaction.user.id },
                { name: "Guild Name", value: interaction.guild.name },
                { name: "Guild ID", value: interaction.guild.id }
              )
              .setTimestamp()
              .setFooter({ text: 'Shard#1' });

          errHook.send({
            embeds: [errHookEmbed]
          });
        }
      }
    });
  }
}

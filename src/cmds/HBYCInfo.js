const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const moment = require("moment");

require("dotenv").config({ path: "src/js/"});

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
  id: cmdHookId,
  token: cmdHookToken
});

const HBYCInfoData = new SlashCommandBuilder()
  .setName("hbycinfo")
  .setDescription("查看我的資訊");


module.exports = {
  data: HBYCInfoData,

  async execute(interaction){
    const guildInfo = interaction.guild.members.cache.get(interaction.client.user.id);

    const HBYCInfoEmbed = new EmbedBuilder()
      .setTitle("我的資訊")
      .addFields(
        { name: "名字", value: interaction.client.user.tag },
        { name: "於本伺服器的暱稱", value: guildInfo.nickname || "無", inline: false },
        { name: "ID", value: interaction.client.user.id, inline: false },
        { name: "加入伺服器時間", value: `<t:${~~(guildInfo.joinedAt/1000)}>`, inline: false },
        { name: "帳號創立時間", value: `<t:${~~(interaction.client.user.createdTimestamp/1000)}>`, inline: false },
        { name: "擁有的身份組", value: `${guildInfo.roles.cache.filter(role => role.name !== '@everyone').map(roles => `${roles}`).join(', ')}`},
        { name: "上次上線時間", value: `<t:${~~(interaction.client.readyTimestamp/1000)}>` }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: `${interaction.user.tag}，查看/help以取得指令文件！` });

    await interaction.reply({ embeds: [ HBYCInfoEmbed ] });

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/hbycinfo`")
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
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const config = require('../../config');

const cmdHook = new WebhookClient({
    id: config.cmdHook.id,
    token: config.cmdHook.token
});

const infoData = new SlashCommandBuilder()
    .setName("info")
    .setDescription("取得伺服器或一個使用者的資訊")
    .addSubcommand(subcommand =>
      subcommand
          .setName("member")
          .setDescription("關於一個使用者的資訊")
          .addUserOption(option => option.setName("使用者").setDescription("要取得資訊的使用者")
      )
    )
    .addSubcommand(subcommand =>
      subcommand
          .setName("server")
          .setDescription("伺服器資訊")
    );

module.exports = {
  data: infoData,

  async execute(interaction) {
    const member = (() => {
      if(interaction.options.getUser("使用者") === null){
          return interaction.user;
      } else {
          return interaction.options.getUser("使用者");
      }
    })();

    if(interaction.options.getSubcommand() === "member"){
      const guildInfo = interaction.guild.members.cache.get(member.id);

      const Status = (() => {
        if(guildInfo.presence?.status === "online") {
            return "🟢 在線";
        } else if(guildInfo.presence?.status === "dnd") {
            return "⛔ 請勿打擾";
        } else if(guildInfo.presence?.status === "idle") {
            return "🌙 閒置";
        } else if(guildInfo.presence?.status === "offline") {
            return "⚫ 離線";
        }
      })();

      const bot = (() => {
        if(member.bot){
            return "是";
        } else {
            return "否";
        }
      })();

      const memberEmbed = new EmbedBuilder()
          .setColor(0xb0ea6b)
          .setTitle(`${member.tag} 的資訊`)
          .addFields(
              { name: "使用者名稱", value: member.username, inline: false },
              { name: "於本伺服器的暱稱", value: guildInfo.nickname || "無", inline: false },
              { name: "ID", value: member.id, inline: false },
              { name: "是否為機器人", value: bot, inline: false },
              { name: "狀態", value: Status },
              { name: "加入伺服器時間", value: `<t:${~~(guildInfo.joinedTimestamp/1000)}>`, inline: false },
              { name: "帳號創立時間", value: `<t:${~~(member.createdTimestamp/1000)}>`, inline: false },
              { name: "擁有的身份組", value: `${guildInfo.roles.cache.filter(role => role.name !== '@everyone').map(roles => `${roles}`).join(', ')}` || "無", inline: false }
          )
          .setThumbnail(member.avatarURL())
          .setTimestamp()
          .setFooter({ text: "HBYC，一個神奇的Discord機器人" });
      
      await interaction.reply({ embeds: [memberEmbed] });

    } else {
      const guild = interaction.guild;
      const guildEmbed = new EmbedBuilder()
          .setColor(0x0090ff)
          .setTitle(`${guild.name} 的資訊`)
          .addFields(
              { name: "伺服器ID", value: guild.id, inline: false },
              { name: "成員數量", value: `${guild.memberCount}`, inline: false },
              { name: "擁有者", value: `<@!${guild.ownerId}>`, inline: false },
              { name: "創立日期", value: `<t:${~~(guild.createdTimestamp/1000)}>`, inline: false }
          )
          .setThumbnail(guild.iconURL())
          .setTimestamp()
          .setFooter({ text: "HBYC，一個神奇的Discord機器人" });

      await interaction.reply({ embeds: [guildEmbed] });
        
    }

    const cmdHookEmbed = new EmbedBuilder()
        .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
        .setColor(0x00bfff)
        .setDescription(`Command: \`/info\` ${interaction.options.getSubcommand()}`)
        .addFields(
            { name: "User Tag", value: interaction.user.tag },
            { name: "User ID", value: interaction.user.id },
            { name: "Guild Name", value: interaction.guild.name },
            { name: "Guild ID", value: interaction.guild.id },
            { name: "Argument", value: member.tag }
        )
        .setTimestamp()
        .setFooter({ text: 'Shard#1' });

    cmdHook.send({
        embeds: [cmdHookEmbed]
    });
  }
}

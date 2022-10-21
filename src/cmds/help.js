const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { links } = require('../constants.json');
const config = require('../../config');

const {cmdHook} = require("../hooks");

const helpData = new SlashCommandBuilder()
  .setName("help")
  .setDescription("取得協助文件")
/*  .addStringOption(option =>
    option.setName("指令名稱")
    .setDescription("欲取得的指令名稱")
    .setRequired(false)
    .addChoices(
      { name: "2048", value: "2048" },
      { name: "announcement", value: "announcement" },
      { name: "avatar", value: "avatar" },
      { name: "bigtwo", value: "bigtwo" },
      { name: "bullsandcows", value: "bullsandcows" },
      { name: "dev", value: "dev" },
      { name: "echo", value: "echo" },
      { name: "finalcode", value: "finalcode" },
      { name: "fliptrip", value: "fliptrip" },
      { name: "github", value: "github" },
      { name: "gomoku", value: "gomoku" },
      { name: "info", value: "info" },
      { name: "ping", value: "ping" },
      { name: "presence", value: "presence" },
      { name: "report", value: "report" },
      { name: "say", value: "say" },
      { name: "select", value: "select" },
      { name: "thinking", value: "thinking" }
    )
  );*/


module.exports = {
  data: helpData,

  async execute(interaction){
    await interaction.reply(`<@!${interaction.user.id}> 指令協助文件在這裡呦:)\n${links.source}/tree/master/docs/help.md`)
        /*const cmdName = interaction.options.getString("指令名稱");

        switch cmdName {
          case "2048":
            await interaction.reply("遊戲指令教學請參見這裡→ https://github.com/dragonyc1002/HBYC/tree/");
            break;
          case "announcement":
            await
            break;
          case "avatar":
            await
            break;

          case "bigtwo":
            await
            break;
          case "bullsandcows":
            await
            break;
          case "dev":
            await
            break;
          case "echo":
            await
            break;
          case "finalcode":
            await
            break;
          case "fliptrip":
            await
            break;
          case "github":
            await
            break;
          case "gomoku":
            await
            break;
          case "info":
            await
            break;
          case "ping":
            await
            break;
          case "presence":
            await
            break;
          case "report":
            await
            break;
          case "say":
            await
            break;
          case "select":
            await
            break;
          case "thinking":
            await
            break;
        }*/

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/help`")
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

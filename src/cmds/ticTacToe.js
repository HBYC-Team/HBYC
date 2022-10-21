const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { DjsTicTacToe } = require('@hizollo/games');
const { ticTacToe } = require('../data/GameStrings.json');
const config = require('../../config');

const {cmdHook} = require("../hooks");

const ticTacToeData = new SlashCommandBuilder()
  .setName("tictactoe")
  .setDescription("遊玩一場圈圈叉叉遊戲！")
  .addIntegerOption(option => 
      option.setName("盤面大小")
      .setDescription("請輸入盤面大小 (1~4)")
      .setRequired(true)
  )
  .addUserOption(option => 
      option.setName("對手1")
      .setDescription("對手 1")
      .setRequired(true)
  )
  .addUserOption(option =>
      option.setName("對手2")
      .setDescription("對手 2")
      .setRequired(false)
  );

module.exports = {
  data: ticTacToeData,

  async execute(interaction){
    const user = interaction.user;
    const p2 = interaction.options.getUser("對手 1");
    const p3 = interaction.options.getUser("對手 2");
    const boardSize = interaction.options.getInteger("盤面大小");

    async function duplicateIds(){
      await interaction.reply({ content: "可惜你沒朋友，只能跟自己玩，沒人陪你哈哈哈，那乾脆不要玩啦！", ephemeral: true });
      return;
    }

    if(!(boardSize > 0 && boardSize <= 4)){
      await interaction.reply({ content: "你沒看到版面大小只能設定 1 至 4 之間嗎？眼睛瞎了？", ephemeral: true });
      return;
    }

    const players = [{
      username: user.username,
      id: user.id,
      symbol: "❌",
      bot: true
    }, {
      username: p2.username,
      id: p2.id,
       symbol: "⭕",
    }];

    if(user.id === p2.id || user === p3?.id){
      duplicateIds();
    }

    if(p3 !== null){
      players.push({
        username: p3.name,
        id: p3.id,
        symbol: "🔺"
      });
    }

    const game = new DjsTicTacToe({
      source: interaction,
      players: players,
      strings: ticTacToe,
      boardSize: boardSize
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/tictactoe`")
      .addFields(
          { name: "User Tag", value: interaction.user.tag },
          { name: "User ID", value: interaction.user.id },
          { name: "Guild Name", value: interaction.guild.name },
          { name: "Guild ID", value: interaction.guild.id },
          { name: "Players", value: `${user.tag} & ${p2.tag}`}
      )
      .setTimestamp()
      .setFooter({ text: 'Shard#1' });
            
    cmdHook.send({
      embeds: [cmdHookEmbed]
    }); 
  }
}
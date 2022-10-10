const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { DjsGomoku } = require('@hizollo/games');
const { gomoku } = require('../data/GameStrings.json');
const config = require('../../config');

const cmdHook = new WebhookClient({
  id: config.cmdHook.id,
  token: config.cmdHook.token
});

const gomokuData = new SlashCommandBuilder()
  .setName("gomoku")
  .setDescription("進行一場五子棋遊戲")
  .addIntegerOption(option => 
    option.setName("棋盤大小")
    .setDescription("棋盤的大小(1~19)")
    .setRequired(true)
  )
  .addUserOption(option => 
    option.setName("p2")
      .setDescription("玩家2")
      .setRequired(true)
  )
  .addUserOption(option => 
    option.setName("p3")
    .setDescription("玩家3")
    .setRequired(false)
  )


module.exports = {
  data: gomokuData,

  async execute(interaction){
    const boardSize = interaction.options.getInteger("棋盤大小");

    if(!(1 <= boardSize && boardSize <= 19 )){
      await interaction.reply({ content: "看不到指令說明上面有寫只能填入1~19的整數嗎？你是業障重嗎？", ephemeral: true });
      return;
    }

    const user = interaction.user;
    const p2 = interaction.options.getUser("p2");
    const p3 = interaction.options.getUser("p3");

    const players = [{
      username: user.username,
      id: user.id,
      symbol: "🔵"
    }, {
      username: p2.username,
      id: p2.id,
      symbol: "🔴"
    }];

    if(p3 !== null){
      players.push({
        username: p3.name,
        id: p3.id,
        symbol: "🟢" 
      });
    }

    if(p2.bot || (p3 !== null && p3.bot)){
      await interaction.reply({ content: "機器人們不會玩五子棋，他們很爛吧，而我的AI功能還在訓練中呢～", ephemeral: true });
      return;
    }

    if(user.id === p2.id){
      await interaction.reply({ content: "你也太悲慘了吧，只能自己跟自己玩喔，找個朋友陪你玩啦 ~~或是開個小帳自己跟自己玩~~", ephemeral: true });
      return;
    }

    const game = new DjsGomoku({
      source: interaction,
      players: players,
      strings: gomoku,
      boardSize: boardSize
    });

    await game.initialize();
    await game.start();
    await game.conclude();

    const cmdHookEmbed = new EmbedBuilder()
      .setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
      .setColor(0x00bfff)
      .setDescription("Command: `/gomoku`")
      .addFields(
        { name: "User Tag", value: user.tag },
        { name: "User ID", value: user.id },
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


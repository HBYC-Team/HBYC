const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client } = require("@hizollo/osu-api");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const config = require('../../config');

const cmdHook = new WebhookClient({
	id: config.cmdHook.id,
	token: config.cmdHook.token
});

const osu = new Client({
	apiKey: config.osu.apiKey
});

const osuData = new SlashCommandBuilder()
	.setName("osu")
	.setDescription("查看特定用戶的osu!資訊")
	.addSubcommand(subcommand =>
		subcommand
			.setName("userinfo")
			.setDescription("取得一個特定玩家的osu!資料")
			.addStringOption(option => 
				option.setName("玩家名稱")
				.setDescription("要取得資訊的玩家名稱")
				.setRequired(true)
			)
	)
	/*.addSubcommand(subcommand =>
		subcommand
			.setName("best")
			.setDescription("取得一個玩家於osu!最佳成績")
			.addStringOption(option =>
				option.setName("玩家名稱")
				.setDescription("要取得最佳成績的玩家名稱")
			)
	)*/

module.exports = {
	data: osuData,

	async execute(interaction){
		if(interaction.options.getSubcommand() === 'userinfo'){
			const osuUsername = interaction.options.getString("玩家名稱");

			const [user] = await osu.users
				.getUser({ user: osuUsername })
				.catch(() => []);

			if(!user){
				await interaction.reply(`我真的找不到 ${osuUsername} 這個玩家 QAQ`)
				return;
			}

			const { 
				username, pp, rank, country, countryRank, level, accuracy, playcount, 
				scoreRankCount: { ssh, ss, sh, s, a } 
			} = user;

			const osuUserEmbed = new EmbedBuilder()
					.setTitle(`玩家 ${osuUsername} 的 osu! 資訊`)
					.addFields(
							{ name: "玩家名稱", value: `[${osuUsername}](${user.profileURL()})` },
			        { name: "SS總計", value: `${ssh + ss}`, inline: true },
			        { name: "SS+", value: `${ssh || 0}`, inline: true },
			        { name: "SS", value: `${ss || 0}`, inline: true },
			        { name: "S總數", value: `${sh + s}`, inline: true },
			        { name: "S+", value: `${sh || 0}`, inline: true },
			        { name: "S", value: `${s || 0}`, inline: true },
			        { name: "A總數", value: `${a || 0}` },
			        { name: "等級", value: `${~~(level)}`, inline: true },
			        { name: "總遊玩次數", value: `${playcount || 0}`, inline: true },
			        { name: "\u200b", value: "\u200b", inline: true },
			        { name: "pp", value: `${pp || 0}`, inline: true },
			        { name: "世界排名", value: `${rank || "-"}`, inline: true },
			        { name: `地區 (${country}) 排名`, value: `${countryRank || "-"}`, inline: true },
			        { name: "打擊準確率", value: `${~~(accuracy*1000)/1000}%` }
			    )
			    .setThumbnail(user.avatarURL())

			await interaction.reply({ embeds: [osuUserEmbed]});

			const cmdHookEmbed = new EmbedBuilder()
				.setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
        .setColor(0x00bfff)
        .setDescription("Command: `/osu userinfo`")
        .addFields(
            { name: "User Tag", value: interaction.user.tag },
            { name: "User ID", value: interaction.user.id },
            { name: "Guild Name", value: interaction.guild.name },
            { name: "Guild ID", value: interaction.guild.id },
            { name: "Osu Player", value: `${osuUsername}` }
        )

      cmdHook.send({
      	embeds: [cmdHookEmbed]
      });
		}/* else if(interaction.options.getSubcommand() === 'best'){
		const best = await osu.users.getUserBest({
			user: userName,
			type: UserRequestType.Id,
			mode: GameMode.Catch,
			limit: 10
		});	*/	
	}
}
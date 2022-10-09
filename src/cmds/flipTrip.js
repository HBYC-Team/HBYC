const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { DjsFlipTrip } = require('@hizollo/games');
const { flipTrip } = require('../GameStrings.json');

require('dotenv').config();

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
	id: cmdHookId,
	token: cmdHookToken
});

const flipTripData = new SlashCommandBuilder()
	.setName("fliptrip")
	.setDescription("開啟一場Flip trip遊戲")
	.addIntegerOption(option =>
		option.setName("棋盤數")
		.setDescription("棋盤數(1~10，1最簡單，10最困難)")
		.setRequired(true)
	)


module.exports = {
	data: flipTripData,

	async execute(interaction){
		const size = interaction.options.getInteger("棋盤數");

		if(size > 10 || size < 1) {
			await interaction.reply({ content: "你沒看到說明上面寫只能填1~10的整數嗎？", ephemeral: true });
			return;
		}

		const game = new DjsFlipTrip({
			source: interaction,
			players: [interaction.user],
			boardSize: size,
			strings: flipTrip
		});

		await game.initialize();
		await game.start();
		await game.conclude();

		const cmdHookEmbed = new EmbedBuilder()
			.setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
			.setColor(0x00bfff)
			.setDescription("Command: `/fliptrip`")
			.addFields(
				{ name: "User Tag", value: interaction.user.tag },
				{ name: "User ID", value: interaction.user.id },
				{ name: "Guild Name", value: interaction.guild.name },
				{ name: "Guild ID", value: interaction.guild.id },
				{ name: "Argument", value: `${size}` }
			)
			.setTimestamp()
			.setFooter({ text: 'Shard#1' });

		cmdHook.send({
			embeds: [cmdHookEmbed]
		});
	}
}

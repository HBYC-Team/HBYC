const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js')
const { DjsTofe } = require('@hizollo/games');
const { tofe } = require('../GameStrings.json');

require('dotenv').config();

const cmdHookId = process.env.cmdHookId;
const cmdHookToken = process.env.cmdHookToken;

const cmdHook = new WebhookClient({
	id: cmdHookId,
	token: cmdHookToken
});

const tofeData = new SlashCommandBuilder()
	.setName("2048")
	.setDescription("開始一場2048遊戲")
	.addStringOption(option => 
		option.setName("難度")
			.setDescription("遊戲的難度")
			.setRequired(true)
			.addChoices(
				{ name: "簡單", value: '簡單模式' },
				{ name: "困難", value: '困難模式' },
			)
	);



module.exports = {
	data: tofeData,
	
	async execute(interaction) {
		const hardMode = (() => {
			if(interaction.options.getString("難度") === "簡單模式"){
				return false;
			} else {
				return true;
			}
		})();

		const game = new DjsTofe({
			hardMode: hardMode,
  		source: interaction, 
  		players: [interaction.user],
  		strings: tofe
		});

		await game.initialize();
		await game.start();
		await game.conclude();

		const cmdHookEmbed = new EmbedBuilder()
			.setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
			.setColor(0x00bfff)
			.setDescription("Command: `/2048`")
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

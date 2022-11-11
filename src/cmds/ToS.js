const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { links } = require('../constants.json');

const { cmdHook } = require('../utils/WebhookManager');

const ToSData = new SlashCommandBuilder()
	.setName("tos")
	.setDescription("查看HBYC的服務條款");

module.exports = {
	data: ToSData,

	async execute(interaction){
		const ToSEmbed = new EmbedBuilder()
			.setTitle("HBYC的服務條款")
			.addFields(
				{ name: "中文版", value: links.tos_zh },
				{ name: "English Version", value: links.tos_en }
			)
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username}，若有更多問題歡迎加入後台伺服器！`, iconURL: interaction.user.displayAvatarURL() })

		await interaction.reply({ embeds: [ToSEmbed] });

		const cmdHookEmbed = new EmbedBuilder()
			.setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
			.setColor(0x00bfff)
			.setDescription("Command: `/tos`")
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

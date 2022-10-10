const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { thinking } = require('../config.json');
const config = require('../../config');

const cmdHook = new WebhookClient({
	id: config.cmdHook.id,
	token: config.cmdHook.token
});

const thinkingData = new SlashCommandBuilder()
	.setName("thinking")
	.setDescription("讓HBYC發出一個thinking的表情符號")
	.addStringOption(option =>
		option.setName("種類")
		.setDescription("要發送的thinking")
		.setRequired(false)
			.addChoices(
				{ name: "normal", value: "normal" },
				{ name: "pythonk", value: "pythonk" },
				{ name: "cat", value: "cat" }, 
				{ name: "attano", value: "attano" },
				{ name: "thonk", value: "thonk" },
				{ name: "superThonk", value: "superThonk" },
				{ name: "ray", value: "ray" },
				{ name: "rainbow", value: "rainbow" },
				{ name: "owo", value: "owo" },
				{ name: "thongk", value: "thongk" },
				{ name: "smile1", value: "smile1" },
				{ name: "smile2", value: "smile2" },
				{ name: "rayteeThonk", value: "raytee" },
				{ name: "blue", value: "blue" },
				{ name: "10", value: "10" },
				{ name: "distortion", value: "distortion" },
				{ name: "pistol", value: "pistol" }
			)
	)


module.exports = {
	data: thinkingData,

	async execute(interaction){
		const type = interaction.options.getString("種類");

		async function sendThink(thinkEmoji){
			await interaction.reply({ content: `${thinkEmoji}已傳送`, ephemeral: true });
			await interaction.channel.send(thinkEmoji);
		}

		switch(type){
			case 'normal': case null:
				sendThink(thinking.normal);
				break;

			case 'pythonk':
				sendThink(thinking.pythonk);
				break;

      case 'cat':
      	sendThink(thinking.cat);
      	break;

      case 'attano':
      	sendThink(thinking.attano);
      	break;

      case 'thonk':
      	sendThink(thinking.thonk);
      	break;

	    case 'superthonk':
	    	sendThink(thinking.superthonk);
	    	break;

      case 'ray':
      	sendThink(thinking.ray);
      	break;

      case 'rainbow':
      	sendThink(thinking.rainbow);
      	break;

      case 'owo':
      	sendThink(thinking.owo);
      	break;

      case 'thongk':
      	sendThink(thinking.thongk);
      	break;

      case 'smile1':
      	sendThink(thinking.smile1);
      	break;

      case 'smile2':
      	sendThink(thinking.smile2);
      	break;

      case 'rayteethonk':
      	sendThink(thinking.rayteethonk);
      	break;

      case 'blue':
      	sendThink(thinking.blue);
      	break;

      case '10':
      	sendThink(thinking.tenThonk);
      	break;

      case 'distortion':
      	sendThink(thinking.distortion);
      	break;

      case 'pistol':
    		sendThink(thinking.pistol);
    		break;
    }
		
		const cmdHookEmbed = new EmbedBuilder()
			.setAuthor({ name: "Command Log", iconURL: interaction.client.user.avatarURL() })
			.setColor(0x00bfff)
			.setDescription("Command: `/thinking`")
			.addFields(
				{ name: "User Tag", value: interaction.user.tag },
				{ name: "User ID", value: interaction.user.id },
				{ name: "Guild Name", value: interaction.guild.name },
				{ name: "Guild ID", value: interaction.guild.id },
				{ name: "Argument", value: `${type}` }
			)
			.setTimestamp()
			.setFooter({ text: 'Shard#1' });

		cmdHook.send({
			embeds: [cmdHookEmbed]
		});
	}
}
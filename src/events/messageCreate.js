const { Message: message, EmbedBuilder, WebhookClient } = require('discord.js');
const { lanBot, dalao, mention, lanDino, www, errors } = require("../config.json");
const { banList } = require("../data/banList.json");
const config = require('../../config')

const msgHook = new WebhookClient({
	id: config.msgHook.id,
	token: config.msgHook.token
});

const errHook = new WebhookClient({
	id: config.errHook.id,
	token: config.errHook.token
});

module.exports = {
	name: "messageCreate",
	
	async execute(message) {
		function getRandomNumber(num){
			return Math.random()*num;
		}

		async function catchError(error){
			if(error.message === 'Missing Permissions') return;

			const channelName = message.client.channels.cache.get(message.channelId);
			await message.author.send(`${errors.messageSendErr}，錯誤代碼如下:\`${error.message}\``);
					
			const errHookEmbed = new EmbedBuilder()
				.setAuthor({ name: `Error Log - ${message.content}`, iconURL: interaction.client.user.avatarURL() })
				.setColor(0xff0000)
				.addFields(
					{ name: "Error Code", value: error.message },
					{ name: "User Tag", value: message.author.tag },
					{ name: "User ID", value: message.author.id },
					{ name: "Guild", value: message.guild.name },
					{ name: "Guild ID", value: message.guild.id }
				)
				.setTimestamp()
				.setFooter({ text: `Shard#4` });

			errHook.send({
				embeds: [errHookEmbed],
			});
		}

		if(message.author.bot) return;
		if(message.guild === null) return;
		if(banList.includes(message.author.id)) return;

		if(message.mentions.has(message.client.user.id, { ignoreRoles: true, ignoreEveryone: true })){
			const item = Math.floor(getRandomNumber(mention.length));
			const mentionReplyMsg = mention[item];

			try {
				await message.channel.send(mentionReplyMsg);

				const msgHookEmbed = new EmbedBuilder()
						.setAuthor({ name: "Error Log", iconURL: interaction.client.user.avatarURL() })
						.setColor(0xcc00ff)
						.addFields(
							{ name: "User Tag", value: message.author.tag },
							{ name: "User ID", value: message.author.id },
							{ name: "Guild", value: message.guild.name },
							{ name: "Guild ID", value: message.guild.id },
							{ name: "Replied", value: mentionReplyMsg }
						)
						.setTimestamp()
						.setFooter({ text: `Shard#2` });

				msgHook.send({
					embeds: [msgHookEmbed],
				});

				return;

			} catch(error){
				catchError(error);
				return;
			}
		}

   	switch(message.content){
   		case '爛bot': case '爛Bot': case '爛BOT':
   			let lanBotChance = Math.round(getRandomNumber(1000))/10;
				const itemRandom = Math.floor(getRandomNumber(lanBot.rare.length));
				const rareRandomReply = lanBot.rare[itemRandom];

				const lanBotReplyMsg = (() => {
					if(lanBotChance >= 40){
						return lanBot.common;
					} else if(lanBotChance < 40 && lanBotChance > 0.5){
						return rareRandomReply;
					} else if(lanBotChance <= 0.5){
						return lanBot.epic;
					}
				})();

				try {
					await message.channel.send(lanBotReplyMsg);

					const msgHookEmbed = new EmbedBuilder()
						.setTitle(`Message Log - ${message.content}`)
						.setColor(0xcc00ff)
						.addFields(
							{ name: "User Tag", value: message.author.tag },
							{ name: "User ID", value: message.author.id },
							{ name: "Guild", value: message.guild.name },
							{ name: "Guild ID", value: message.guild.id },
							{ name: "Replied", value: lanBotReplyMsg }
						)
						.setTimestamp()
						.setFooter({ text: `Shard#2` });

					msgHook.send({
						embeds: [msgHookEmbed],
					});

				} catch(error){
					catchError(error);
				}

				break;

			case 'x04bot':
				try {
					await message.channel.send("要罵人之前請先記得切換輸入法呦;)");

					const msgHookEmbed = new EmbedBuilder()
						.setTitle(`Message Log - ${message.content}`)
						.setColor(0xcc00ff)
						.addFields(
							{ name: "User Tag", value: message.author.tag },
							{ name: "User ID", value: message.author.id },
							{ name: "Guild", value: message.guild.name },
							{ name: "Guild ID", value: message.guild.id }
						)
						.setTimestamp()
						.setFooter({ text: `Shard#2` });

					msgHook.send({
						embeds: [msgHookEmbed],
					});

				} catch(error){
					catchError(error);
				}

				break;
		
			case '大佬': case '佬': case 'dalao':
				const dalaoItem = Math.round(getRandomNumber(dalao.length));
				
				const dalaoReplyMsg = dalao[dalaoItem];

				try {
					await message.channel.send(dalaoReplyMsg);

					const msgHookEmbed = new EmbedBuilder()
						.setTitle(`Message Log - ${message.content}`)
						.setColor(0xcc00ff)
						.addFields(
							{ name: "User Tag", value: message.author.tag },
							{ name: "User ID", value: message.author.id },
							{ name: "Guild", value: message.guild.name },
							{ name: "Guild ID", value: message.guild.id },
							{ name: "Replied", value: dalaoReplyMsg }
						)
						.setTimestamp()
						.setFooter({ text: `Shard#2` });

					msgHook.send({
						embeds: [msgHookEmbed],
					});

				} catch(error){
					catchError(error);
				}

				break;

			case '爛恐龍': case '恐龍很爛':
				const lanDinoItem = Math.floor(getRandomNumber(lanDino.length));
				
				lanDinoReplyMsg = lanDino[lanDinoItem];

				try {
					await message.channel.send(lanDinoReplyMsg);

					const msgHookEmbed = new EmbedBuilder()
						.setTitle(`Message Log - ${message.content}`)
						.setColor(0xcc00ff)
						.addFields(
							{ name: "User Tag", value: message.author.tag },
							{ name: "User ID", value: message.author.id },
							{ name: "Guild", value: message.guild.name },
							{ name: "Guild ID", value: message.guild.id },
							{ name: "Replied", value: lanDinoReplyMsg }
						)
						.setTimestamp()
						.setFooter({ text: `Shard#2` });

					msgHook.send({
						embeds: [msgHookEmbed],
					});

				} catch(error){
					catchError(error);
				}

				break;
		
			case 'w': case 'ww': case 'www': case 'wwww': case 'wwwww':
				const wwwReplyChance = Math.round(getRandomNumber(1000))/10;

				if(wwwReplyChance > 50) return;
			
				const wwwReplyType = (() => {
					if(wwwReplyChance <= 50 && wwwReplyChance > 30){
						return www.common1;
					} else if(wwwReplyChance <= 30 && wwwReplyChance > 10){
						return www.common2;
					} else if(wwwReplyChance <= 10 && wwwReplyChance > 0.2){
						return www.rare;
					} else if(wwwReplyChance <= 0.2){
						return www.epic;
					}
				})();

				try {
					await message.channel.send(wwwReplyType);

					const msgHookEmbed = new EmbedBuilder()
					.setTitle(`Message Log - ${message.content}`)
					.setColor(0xcc00ff)
					.addFields(
						{ name: "User Tag", value: message.author.tag },
						{ name: "User ID", value: message.author.id },
						{ name: "Guild", value: message.guild.name },
						{ name: "Guild ID", value: message.guild.id },
						{ name: "Chance", value: `${wwwReplyChance}` },
						{ name: "Replied", value: wwwReplyType }
					)
					.setTimestamp()
					.setFooter({ text: `Shard#2` });

					msgHook.send({
						embeds: [msgHookEmbed],
					});

				} catch(error){
					catchError(error);
				}

				break;
		}
	}
}
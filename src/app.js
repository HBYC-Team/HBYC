/************************************************************
 ************************************************************
 **********  Project Name : HBYC                   **********
 **********  Author       : HBYC-Team Organization **********
 **********  License      : GPL-3.0                **********
 **********  Version      : 3.1.1                  **********
 **********  Release Date : 2022-10-19             **********
 ************************************************************
 ************************************************************/
 
 /*
 *
 * Copyright 2022 HBYC-Team <https://github.com/HBYC-Team>.
 *
 * HBYC is a open source project. Before you using this project, please follow the LICENSE file.
 *
 * See the disclaimer in docs folder.
 *
 * You can redistribute this project under GNU General Public License 3.0.
 *
 * See more details of GNU General Public License 3.0 on the website <https://www.gnu.org/licenses/>.
 *
 * According to our additional license, you CANNOT use this project for ANY BUSINESS PROJECTS.
 *
 */


const { Client, Collection, GatewayIntentBits, Partials, InteractionType, WebhookClient, EmbedBuilder } = require('discord.js');
const { bot, supportGuild } = require('./constants.json');
const { banList } = require('./data/banList.json');
const fs = require('fs');
const config = require('../config');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent
  ], 
  partials: [
    Partials.Channel, 
    Partials.Message, 
    Partials.User, 
    Partials.GuildMember, 
    Partials.Reaction
  ] 
});

const botHook = new WebhookClient({
  id: config.botHook.id,
  token: config.botHook.token
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/cmds').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.data.name, command);
}

for(const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on("guildCreate", guild => {
  const guildJoinHookEmbed = new EmbedBuilder()
      .setTitle(`Bot Log - Joined Guild`)
      .setColor(0x29803b)
      .addFields(
        { name: "Guild Name", value: guild.name },
        { name: "Guild ID", value: guild.id },
        { name: "Server Count", value: `${guild.client.guilds.cache.size}` }
      ) 
      .setTimestamp()
      .setFooter({ text: `Shard#3` });

  botHook.send({
    embeds: [guildJoinHookEmbed]
  });
});

client.on("guildDelete", guild => {
  const guildJoinHookEmbed = new EmbedBuilder()
      .setTitle(`Bot Log - Lefted Guild`)
      .setColor(0x362980)
      .addFields(
        { name: "Guild Name", value: guild.name },
        { name: "Guild ID", value: guild.id },
        { name: "Server Count", value: `${guild.client.guilds.cache.size}` }
      ) 
      .setTimestamp()
      .setFooter({ text: `Shard#3` });

  botHook.send({
    embeds: [guildJoinHookEmbed]
  });
});

client.login(config.bot.token);
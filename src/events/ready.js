const { EmbedBuilder, WebhookClient } = require('discord.js');
const moment = require('moment');
const config = require('../../config');
const {botHook} = require("../hooks");

module.exports = {
  name: "ready",
  
  async execute(client) {
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    
    await client.user.setPresence({ activities: [{ name: `在 ${client.guilds.cache.size} 個伺服器中被壓榨\(´･ω･\`\)` }] });

    const loginEmbed = new EmbedBuilder()
      .setColor(0x83ae58)
      .setTitle("Bot Logined")
      .setDescription(client.user.tag)
      .addFields(
          { name: "Logined at", value: time },
          { name: "Server Count", value: `${client.guilds.cache.size}` }
      )
      .setTimestamp()
      .setFooter({ text: "Shard#3" });

    const serverNames = client.guilds.cache.map(guild => guild.name);
    const serverIds = client.guilds.cache.map(guild => guild.id);
      
    botHook.send({
      embeds: [loginEmbed],
    });

    console.log(serverNames);
    console.log(serverIds);
  }
}

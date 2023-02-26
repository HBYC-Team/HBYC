const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const fs = require('fs');

const { devGuild }  = require('./constants.json');

const config = require('../config');

const token = config.bot.token;
const clientId = config.bot.id;

const disableOsu = config.bot.disableOsu;

const globalCommands = [];
const privateCommands = [];

const fsReadCmdDirSync = fs.readdirSync('./src/cmds');

const globalCommandFiles = disableOsu ? 
  fsReadCmdDirSync.filter(file => file.endsWith('.js') && !file.includes('osu')) :
  fsReadCmdDirSync.filter(file => file.endsWith('.js'));

for(const file of globalCommandFiles){
  const command = require(`./cmds/${file}`);
  globalCommands.push(command.data.toJSON());
}

const privateCommandFiles = fs.readdirSync('./src/cmds').filter(file => file.endsWith('.cjs'));

for(const file of privateCommandFiles){
  const command = require(`./cmds/${file}`);
  privateCommands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application commands.");

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: globalCommands }
    );

    console.log("Started refreshing private application commands.");

    await rest.put(
      Routes.applicationGuildCommands(clientId, devGuild.id),
      { body: privateCommands }
    );
  } catch(err) {
    console.error(err);
  }
})();

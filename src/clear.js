const https = require('https');

const config = require('../config');

clear(config.bot.token);

// Main function
async function clear(token, guild) {
  const { id } = await getDataByToken(token);
  const data = JSON.stringify([]);
  const path = guild
    ? `/api/v9/applications/${id}/guilds/${guild}/commands`
    : `/api/v9/applications/${id}/commands`;

  // Sends request
  const req = https.request({
    protocol: 'https:',
    hostname: 'discord.com',
    path: path,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
      Authorization: `Bot ${token}`
    }
  }, res => {
    let r = '';

    res.on('data', (chunk) => {
        r += chunk;
    });

    res.once('end', () => {
      if (res.statusCode !== 200) {
        console.error(JSON.parse(r));
        throw new Error('Failed to clear commands.');
      }

      console.log('Commands has been cleared.')
      if (!guild) console.log('The global commands has been cleared.');
      else console.log('Guild id:' + guild);
    });
  });

  req.write(data);
  req.end();
}


// A function which gets data with the token
function getDataByToken(token) {
  return new Promise((resolve, reject) => {
    https.get('https://discord.com/api/v9/users/@me', {
      headers: {
        Authorization: `Bot ${token}`
      }
    }, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.once('end', () => {
        if (res.statusCode !== 200) return reject(JSON.parse(data));
        resolve(JSON.parse(data))
      });
    });
  });
}
require('dotenv').config();

if(!process.env.TOKEN) throw new Error('Bot token has not been configured.');
if(!process.env.clientId) throw new Error('Bot client id has not been configured.');
if(!process.env.cmdHookId) throw new Error('Command Log Webhook id has not been configured.');
if(!process.env.cmdHookToken) throw new Error('Command Log Webhook token has not been configured.');
if(!process.env.msgHookId) throw new Error('Message Log Webhook id has not been configured.');
if(!process.env.msgHookToken) throw new Error('Message Log Webhook token has not been configured.');
if(!process.env.botHookId) throw new Error('Bot Status Log Webhook id has not been configured.');
if(!process.env.botHookToken) throw new Error('Bot Status Log Webhook token has not been configured.');
if(!process.env.errHookId) throw new Error('Error Log Webhook id has not been configured.');
if(!process.env.errHookToken) throw new Error('Error Log Webhook token has not been configured.');
if(!process.env.reportHookId) throw new Error('Report Log Webhook id has not been configured.');
if(!process.env.reportHookToken) throw new Error('Report Log Webhook token has not been configured.');

if(!process.env.osuApiKey) throw new Error('Osu! Api Key has not been configured.');  

module.exports = {
  bot: {
    id: process.env.clientId,
    token: process.env.TOKEN
  },
  cmdHook: {
    id: process.env.cmdHookId,
    token: process.env.cmdHookToken
  },
  msgHook: {
    id: process.env.msgHookId,
    token: process.env.msgHookToken
  },
  botHook: {
    id: process.env.botHookId,
    token: process.env.botHookToken
  },
  errHook: {
    id: process.env.errHookId,
    token: process.env.errHookToken
  },
  reportHook: {
    id: process.env.reportHookId,
    token: process.env.reportHookToken
  },
  osu: {
    apiKey: process.env.osuApiKey
  }
}
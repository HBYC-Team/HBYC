const cmdHook = new WebhookClient({
	id: config.cmdHook.id,
	token: config.cmdHook.token
});

const botHook = new WebhookClient({
    id: config.botHook.id,
    token: config.botHook.token
});

const msgHook = new WebhookClient({
	id: config.msgHook.id,
	token: config.msgHook.token
});

const errHook = new WebhookClient({
	id: config.errHook.id,
	token: config.errHook.token
});

module.exports = {
    cmdHook, botHook, msgHook, errHook
}
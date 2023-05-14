const { BotConfig } = require("../../../../config.json")
module.exports = {
	name: "link",
	aliases: [],
	category: "core",
	utilisation: "link <dm>",
	desc: "Sends links to add the discord bot! Not specificing where or providing an invalid location to send will result in it sending it in the current channel.",
	async execute(messageCreate, args, prefix) {
		if(args[0] == "dm") return messageCreate.author.send(BotConfig.BotSite).catch((error) => {
			console.error(error)
			return messageCreate.channel.send(`We could not send it to your dms, sending here instead! \n${BotConfig.BotSite}`)
		})
		return messageCreate.channel.send(BotConfig.BotSite)
	}
}

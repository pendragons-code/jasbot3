const { EmbedBuilder } = require("discord.js")
const { BotConfig, Default } = require("../../../../config.json")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
module.exports = {
	name: "blacklist",
	aliases: [],
	category: "creator",
	utilisation: "blacklist <@user> <on/off/check>",
	desc: "Blacklists user from discord bot!",
	maxArgs: 2,
	async execute(messageCreate, args, mainPrefix) {
		let user = getUserFromMention(args[0])
		if(!user) return
	}
}

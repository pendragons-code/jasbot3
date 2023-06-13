const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "weather",
	aliases: [],
	category: "utility",
	desc: "A command that gives you details of the current weather.",
	utilisation: "weather <location here>",
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let locationToQuery = args.join(" ")
		let weatherEmbed = new EmbedBuilder()
		weatherEmbed.setTitle()
		weatherEmbed.setDescription()
		weatherEmbed.setColor(Default.DefaultEmbedColor)
		weatherEmbed.setTimestamp()
		weatherEmbed.setFooter({ text: Default.DefaultFooterText })
		weatherEmbed.setURL(BotConfig.BotSite)
	}
}

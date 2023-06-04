const covidApi = require("novelcovid")
const reject = require("../../../../assets/responseComponents/rejection.json")
const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
module.exports = {
	name: "global",
	aliases: [],
	category: "utility",
	utilisation: "global",
	desc: "Shows globals statistics for covid, based on the novelcovid api (npm).",
	async execute(messageCreate, args, prefix) {
		const globalStats = covidApi.all()
		const globalCovidEmbed = new EmbedBuilder()
		globalCovidEmbed.setColor(Default.DefaultEmbedColor)
		globalCovidEmbed.setFooter({ text: Default.DefaultFooterText })
		globalCovidEmbed.setTimestamp()
		globalCovidEmbed.setURL(BotConfig.BotSite)
		globalCovidEmbed.setTitle("Global statistics!")
		globalCovidEmbed.setDescription("Information comes from novelcovid api (npm).")
		globalCovidEmbed.addFields(
			{ name: "Cases:", value: globalStats.cases },
			{ name: "Active:", value: globalStats.active },
			{ name: "Critical:", value: globalStats.critical },
			{ name: "Deaths:", value: globalStats.deaths },
			{ name: "Recovered:", value: globalStats.recovered }
		)
		return messageCreate.channel.send({ embeds: [globalCovidEmbed] })
	}
}

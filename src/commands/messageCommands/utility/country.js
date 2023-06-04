const { countries } = require("novelcovid")
const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "country",
	aliases: [],
	category: "utility",
	utilisation: "country <country name>",
	desc: "Shows covid details for a specific country, this uses the novelcovid api (npm)!",
	async execute(messageCreate, args, prefix) {
		if(!args) return messageCreate.channel.send(reject.UserFault.args.missing)
		let countryData = await countries({ country: args.join(" ") })
		if(!countryData) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		const countryCovidEmbed = new EmbedBuilder()
		countryCovidEmbed.setColor(Default.DefaultEmbedColor)
		countryCovidEmbed.setFooter({ text: Default.DefaultFooterText })
		countryCovidEmbed.setURL(BotConfig.BotSite)
		countryCovidEmbed.setTimestamp()
		countryCovidEmbed.setTitle(`${args.join(" ")} cases!`)
		countryCovidEmbed.setDescription(`Cases: ${countryData.cases}\nDeaths: ${countryData.death}\nCritical: ${countryData.critical}\nTests: ${countryData.tests}\nPopulation: ${countryData.population}\nDeaths Today: ${countryData.todayDeaths}`)
		messageCreate.channel.send({ embeds: [countryCovidEmbed] })
	}
}

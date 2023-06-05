const { Default } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
require("dotenv").config()

const tenorKey = process.env.TenorKey

module.exports = {
	name: "tenor",
	aliases: [],
	category: "utility",
	utilisation: "tenor <tag>",
	desc: "Sends 1 random result of the top 10 search results from tenor's API.",
	maxArgs: 1,
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let results = await axios({
			method: "get",
			url: `https://g.tenor.com/v1/search?q=${args[0]}&key=${tenorKey}&limit=10`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		let selection = Math.floor(Math.random() * 9)
		const tenorEmbed = new EmbedBuilder()
		tenorEmbed.setColor(Default.DefaultEmbedColor)
		tenorEmbed.setTimestamp()
		tenorEmbed.setFooter({ text: "These GIFs are from tenor.com!" })
		tenorEmbed.setTitle("Incoming GIF from tenor!")
		tenorEmbed.setURL(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setImage(results.data.results[selection].media[0].mediumgif.url)
		tenorEmbed.setDescription(`Providing search results for: ${args[0]}`)
		return messageCreate.channel.send({ embeds: [tenorEmbed] })
	}
}

const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utility",
	utilisation: "lyrics <here/dm> <query>",
	desc: "Sends lyrics/link in current channel! It will send the link if it is too long to fit in the embed.",
	async execute(messageCreate, args, prefix) {
		let results = await axios({
			method: "GET",
			url: "https://some-random-api.ml/lyrics?title?=",
			headers: {}
		})
	}
}

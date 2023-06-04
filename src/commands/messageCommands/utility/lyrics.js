const { Default } = require("../../../../config.json")
const axios = require("axios")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "lyrics",
	aliases: [],
	category: "utility",
	utilisation: "lyrics <here/dm> <query>",
	desc: "Sends lyrics/link in current channel! It will send the link.",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(reject.UserFault.args.missing)
		let acceptedSendLocations = ["here", "dm"]
		if(!acceptedSendLocations.includes(args[0])) return messageCreate.channel.send(reject.UserFault.args.invalid)
		let results = await axios({
			method: "GET",
			url: `https://some-random-api.ml/lyrics?title?=${args.shift()}`,
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip,deflate,compress"
			}
		})
		if(!results.links.genius) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		if(results.data.error) return messageCreate.channel.send(reject.WeAreScrewed.BadApiResponse)
		if(results.data.lyrics.includes(Default.DefaultBannedWords)){
			messageCreate.reply("The song contains content or words that can be associated with disturbing content (or some level of profanity). We will be sending a link to your Direct Messages, this is to warn people, kinda like a spoiler warning.")
			return messageCreate.author.send(`Look at the disclaimer before clicking the link!\n ${results.data.link.genius}`)
		}
		if(args[0] === "dm") return messageCreate.author.send(results.data.link.genius)
		return messageCreate.channel.send(results.data.link.genius)
	}
}

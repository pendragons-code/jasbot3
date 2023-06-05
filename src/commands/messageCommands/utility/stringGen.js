const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const { stringGeneration } = require("../../../functions/randomGeneration/stringGeneration.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "stringgen",
	aliases: [],
	category: "utility",
	desc: "Generates random string with options!",
	utilisation: "stringgen <alphanumericals/alphabets/numbersonly/all> <character length>\nstringgen <help>",
	maxArgs: 1,
	async execute(messageCreate, args, prefix) {
		let possibleOptions = ["alphanumericals", "alphabets", "all", "numbersonly", "help"]
		if(!args[0]|| !args[1] && args[0] != "help") return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[1] > 2000) return messageCreate.channel.send(reject.UserFault.numbers.notInRange)
		if(!options.includes(args[0])) return messageCreate.channel.send(reject.UserFault.args.invalid)
		if(isNaN(args[1])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		let caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		let noCaps = "abcdefghijklmnopqrstuvwxyz"
		let nums = "1234567890"
		let speChar = "\"\`~@#$%^&*()_=+;',/.|{}][-\\"
		let set = ""
		switch(args[0]) {
			case "numsonly":
				set = nums
				break
			case "alphanumericals":
				set = nums + caps + noCaps
				break
			case "alphabets":
				set = caps + noCaps
				break
			case "all":
				set = nums + caps + noCaps + speChar
				break
			default:
				return messageCreate.channel.send(`Options available: \`${options.joins("`, `")}\``)
		}
		return messageCreate.channel.send(await stringGeneration(args[1], set))
	}
}

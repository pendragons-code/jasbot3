const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "poll",
	aliases: [],
	category: "utility",
	utilisation: "poll <number of emojis> <emojis [scalable]> <words here>\n poll 5 🙂 🔗 👍 🔥 😭 Which emoji here do you all like most?",
	desc: "Initiates polls with specified fields!",
	async execute(messageCreate, args, prefix) {
		if(!args[2]) return messageCreate.channel.send(reject.UserFault.args.invalid)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		if(args[0] < 1) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		let embed = new EmbedBuilder()
		embed.setTitle("Time to vote!")
		embed.setColor(Default.DefaultEmbedColor)
		embed.setFooter({ text: Default.DefaultFooterText })
		embed.setTimestamp()
		embed.setDescription(`${args.slice(args[0] + 1).join(" ")}`)
		embed.setURL(BotConfig.BotSite)
		messageCreate.channel.send({ embeds: [embed] })
		.then(embedMessage => {
			while(i < parseInt(args[0])) {
				embedMessage.react(args[i+1])
				.catch((error) => {
					console.error(error)
					return messageCreate.reply(`${reject.WeAreScrewed.ExecutionError}\n Contact devs if issue persists.`)
				})
			}
		})
	}
}

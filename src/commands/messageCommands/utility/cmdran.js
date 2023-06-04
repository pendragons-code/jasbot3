const { EmbedBuilder } = require("discord.js")
const { getUserFromMention } = require("../../../functions/mentions/users.js")
const { Default, BotConfig } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "cmdran",
	aliases: [],
	category: "utility",
	desc: "Fetches the number of commands you have ran on this bot so far!",
	utilisation: "cmdran or cmdran <@user>",
	async execute(messageCreate, args, prefix) {
		let user = args[0] ? getUserFromMention(args[0]) : messageCreate.author
		if(user.id) return messageCreate.channel.send(reject.UserFault.mentions.invalid)
		const cmdRanEmbed = new EmbedBuilder()
		let cmdRanNumber = await db.get(`cmdsRan_${user.id}`)
		cmdRanEmbed.setFooter({ text: Default.DefaultFooterText })
		cmdRanEmbed.setURL(BotConfig.BotSite)
		cmdRanEmbed.setTimestamp()
		cmdRanEmbed.setColor(Default.DefaultEmbedColor)
		cmdRanEmbed.setTitle("Commands ran!")
		cmdRanEmbed.setDescription(`This user has ran ${cmdRanNumber} commands!`)
		return messageCreate.channel.send({ embeds: [cmdRanEmbed] })
	}
}

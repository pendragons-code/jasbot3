const { EmbedBuilder } = require("discord.js")
const { Default, BotConfig } = require("../../../../config.json")
const { version, author } = require("../../../../package.json")
module.exports = {
	name: "version",
	aliases: ["-v"],
	category: "core",
	desc: "Sends you soime info about the bot and the version of the discord bot!",
	utilisation: "version",
	async execute(messageCreate, args, prefix) {
		const versionEmbed = new EmbedBuilder()
		versionEmbed.setTitle("Version Details!")
		versionEmbed.setFooter({ text: Default.DefaultFooterText })
		versionEmbed.setURL(BotConfig.BotSite)
		versionEmbed.setColor(Default.DefaultEmbedColor)
		versionEmbed.setTimestamp()
		versionEmbed.setDescription(`Jasbot is currently on ${version}!\nPoorly made by ${author}!`)
		return messageCreate.channel.send({ embeds: [ versionEmbed ] })
	}
}

const { convertAngles } = require("../../../functions/conversion/angles/angles.js")
const { EmbedBuilder } = require("discord.js")
const { conversion } = require("../../../../assets/responseComponents/disclaimers.json")
const { Default, BotConfig } = require("../../../../config.json")
const reject = require("../../../../assets/responseComponents/rejection.json")
// Due to some suggestions from friends around the world, I might move command responses to a .json file, that way we can have responses for multiple languages.
module.exports = {
	name: "gradians",
	aliases: ["gradian"],
	category: "angles",
	desc: conversion.value,
	utilisation: "gradians <amt>",
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
		if(isNaN(args[0])) return messageCreate.channel.send(reject.UserFault.numbers.invalid)
		let angleValue = await convertAngles(parseFloat(args[0]), "gradian")
		const angleEmbed = new EmbedBuilder()
		angleEmbed.setColor(Default.DefaultEmbedColor)
		angleEmbed.setFooter({ text: Default.DefaultFooterText })
		angleEmbed.setTimestamp()
		angleEmbed.setURL(BotConfig.BotSite)
		angleEmbed.setDescription(angleValue)
		angleEmbed.setTitle("Conversion!")
		angleEmbed.addFields({ name: conversion.name, value: conversion.value})
		return messageCreate.channel.send({ embeds: [angleEmbed] })
	}
}

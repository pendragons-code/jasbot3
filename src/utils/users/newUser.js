// inform new users about how to use this bot and shit.
const { EmbedBuilder } = require("discord.js")
const { Default } = require("../../../config.json")
const reject = require("../../../assets/responseComponents/rejection.json")

module.exports = {
	name: "newuser",
	async execute(messageCreate, args) {
		const NewUserEmbeds = new EmbedBuilder()
		NewUserEmbeds.setTitle("Hello there new user!")
		NewUserEmbeds.setDescription("Hello there new user! I am Jasbot, a poorly made bot for discord. I aim to be helpful to you, please do support me, thank you!")
		NewUserEmbeds.setFooter({ text: Default.DefaultFooterText })
		NewUserEmbeds.setColor(Default.DefaultEmbedColor)
		db.set(`NewUser_${messageCreate.author.id}`, "Sent")
		.catch((error) => {
			messageCreate.reply(reject.WeAreScrewed.ExecutionError)
			return console.error(error)
		})
		return messageCreate.author.send({ embeds: [NewUserEmbeds] })
		.catch((embedSendError) => {
			console.error(embedSendError)
			return messageCreate.reply({ embeds: [NewUserEmbeds] })
		})
	}
}

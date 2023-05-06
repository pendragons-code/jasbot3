// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
const { EmbedBuilder, InteractionType } = require("discord.js")
const { BotConfig } = require("../../../config.json")
const PermissionList = require("../../../assets/responseComponents/rejection.json")
module.exports = async (bot, interactionCreate) => {
	if(interactionCreate.type == InteractionType.ApplicationCommand) {
		let editMode = await db.get("editMode")
		let newUser = await db.get(`NewUser_${interactionCreate.user.id}`)
		let BlackListedUser = await db.get(`blacklisted_${interactionCreate.user.id}`)
		if(editMode == "on" && interactionCreate.user.id != BotConfig.BotOwnerID) return interactionCreate.reply(reject.BotDownTime.editMode)
		if(BlackListedUser == "yes") return interactionCreate.reply(reject.UserFault.privilege.BlackListedUser)
		const slashCmd = bot.slashCommands.get(interactionCreate.commandName)
		const errorEmbed = new EmbedBuilder()
	}
}

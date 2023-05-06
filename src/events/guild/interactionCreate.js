// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
const { EmbedBuilder, InteractionType } = require("discord.js")
const { BotConfig } = require("../../../config.json")
const PermissionList = require("../../../assets/responseComponents/rejection.json")
module.exports = async (bot, interactionCreate) => {
	if(interactionCreate.type == InteractionType.ApplicationCommand) {
		let editMode = await db.get("editMode")
		let BlackListedUser = await db.get(`blacklisted_${interactionCreate.user.id}`)
		if(editMode == "on" && interactionCreate.user.id != BotConfig.BotOwnerID) return interactionCreate.reply(reject.BotDownTime.editMode)
		if(BlackListedUser == "yes") return interactionCreate.reply(reject.UserFault.privilege.BlackListedUser)
		const slashCmd = bot.slashCommands.get(interactionCreate.commandName)
		if(slashCmd) return // might not add it, but actually if discord does not get the updated array and it gets sent it might crash
		if(slashCmd.category === "over18" && !interactionCreate.channel.nsfw) return interactionCreate.reply("You can only run this command in an nsfw channel!")
		if(slashCmd.minperms) {
			let errorEmbed = new EmbedBuilder()
			errorEmbed.setTitle("Error!")
			for(let i = 0; i < slashCmd.minPerms.length; ++i) if(!inter.member.permissions.has(slashCmd.minPerms[i])) {
				let PermissionQuery = PermissionList[slashCmd.minPerms[i]]
				if(!Array.isArray(slashCmd.minPerms[i])) {
					errorEmbed.setDescription(`${reject.UserFault.privilege.MissingPermissions} You are missing ${PermissionQuery}!`)
					return interactionCreate.reply({ embeds: [errorEmbed] })
				}
				for(let perArray = 0; perArray < slashCmd.minPerms[i].length; ++perArray) {
					let PermissionQuery = ""
					let MissingPermissionName = PermissionList[slashCmd.minPerms[i][perArray]]
					PermissionQuery + `\`${MissingPermissionName}\``
					if(slashCmd.minPerms[i][perArray + 1]) PermissionQuery + ", "
					errorEmbed.setDescription(`${reject.UserFault.privilege.MissingPermissions} You are missing ${PermissionQuery}!`)
					return interactionCreate.reply({ embeds: [errorEmbed] })
				}
			}
		}
		try {
			const commandDisable = await db.get(`disabledCommand_${interactionCreate.guild.id}_${slashCmd.name}`)
			const categoryDisable = await db.get(`disabledCategory_${interactionCreate.guild.id}_${slashCmd.category}`)
			if(commandDisable == "disabled" || categoryDisable == "disabled") return interactionCreate.reply(reject.UserFault.privilege.BlackListedUser )
			if(slashCmd.category === "creator" && interactionCreate.user.id !== BotConfig.BotOwnerID) interactionCreate.reply("You are not allowed to use this command!")
			slashCmd.execute(bot, interactionCreate)
			await db.add(`cmdsRan_${interactionCreate.user.id}`, 1)
			.catch((error) => {
				console.error(error)
				interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
			})
		} catch(e) {
			console.error(e)
			return interactionCreate.reply(reject.WeAreScrewed.ExecutionError)
		}
	}
	if(interactionCreate.type === InteractionType.MessageComponent) {
		let ButtonID = await JSON.parse(interactionCreate.customId)
		let ButtonFile = await ButtonID.ffb
		if(!ButtonFile) return
		delete require.cache[require.resolve(`../../buttons/${ButtonFile}.js`)];
		const button = require(`../../buttons/${ButtonFile}.js`)
		if(button) return button({ bot, interactionCreate, ButtonID });
	}
}

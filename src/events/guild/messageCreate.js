const { Default, BotConfig } = require("../../../config.json")
const env = require("dotenv").config()
const reject = require("../../../assets/responseComponents/rejection.json")
const PermissionList = require("../../../assets/responseComponents/permission.json")

module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokensecurity").execute(messageCreate, args)
	if(messageCreate.author.bot || messageCreate.channel.type == "dm") return
	let editMode = await db.get("editMode")
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let newUser = await db.get(`NewUser_${messageCreate.author.id}`)
	let BlackListedUser = await db.get(`blacklisted_${messageCreate.author.id}`)
	// call antiswear here
	// made it separate so it is easier to mod and can be called by other events!
	if(dbPrefix === null) dbPrefix = Default.DefaultPrefix
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${BotConfig.BotID}>`	
	if(messageCreate.content.indexOf(prefix) !== 0) return
	if(BlackListedUser === "yes") return messageCreate.channel.send(reject.privilege.BlackListedUser)
	if(editMode == "on" && messageCreate.author.id !== BotConfig.BotOwnerID) return messageCreate.channel.send(reject.BotDownTime.editMode)
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(!cmd) return
	try {
	} catch(errorInMessageCreate) {
		console.error(errorInMessageCreate)
		return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
	}
}

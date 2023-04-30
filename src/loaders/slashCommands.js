const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
console.log("[slashCommands]: Starting loading!")
bot.slashCommands = new Collection()
CommandsArray = []
let slashCommandDirs = readdirSync("./src/commands/slashCommands").filter(dirs => dirs)
for(dirs of slashCommandDirs) {
	const perSlashCommandFile = readdirSync(`./src/commands/slashCommands/${dirs}/`).filter(file => file.endsWith("js"))
	for(file of perSlashCommandFile) {
		const slashCommand = require(`../commands/slashCommands/${dirs}/${file}`)
		bot.slashCommands.set(slashCommand.name.toLowerCase(), slashCommand)
		console.log(`Loading slashCommands: ${file} from ${dirs}!`)
		CommandsArray.push(slashCommand)
		delete require.cache[require.resolve(`../commands/slashCommands/${dirs}/${file}`)]
	}
}
bot.on("ready", (bot) => {
	bot.application.commands.set(CommandsArray)
})
//I did consider putting this in the ready.js under events
console.log("[slashCommands]: Done loading!")

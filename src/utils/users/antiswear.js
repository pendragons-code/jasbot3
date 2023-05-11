const { Default } = require("../../../config.json")
module.exports = {
	name: "antiswear",
	async execute(messageCreate) {
		let guildAntiSwearSettings = await db.get(`antiswear_${messageCreate.guild.id}`)
		let guildAntiSwearExcludedChannels = await db.get(`antiswearExcludedChannels_${messageCreate.guild.id}`) // expect this to be an array, check if the channel is in the array;
		let bannedWords = await db.get(`bannedWords_${messageCreate.guild.id}`)
		if(bannedWords === null) await db.set(`bannedWords_${messageCreate.guild.id}`, Default.DefaultBannedWords)
		// So when the user turns on anti-swear it will be null, this changes null to become the default anti-swear dictionary
		// But when the user makes antiswear null and the thing is on via the "remove words" feature, this thing will just probably crash or ignore
		// So this basically makes it that if the user has erased all the anti-swear


		// future features may include: 
		// specific channels without anti-swear
		if(guildAntiSwearSettings === null || guildAntiSwearExcludedChannels !== null && guildAntiSwearExcludedChannels.includes(messageCreate.channel.id) ) return
		// null only because I will delete the entry instead.
		// The reason behind this is to save disk space and also reduce writing, instead of changing "on" to "off"
		for(i = 0; i < bannedWords.length; i++) if(messageCreate.content.includes(bannedWords[i])) {
			messageCreate.delete()
			.catch((cannotDeleteError) => {
				console.error(cannotDeleteError)
				return console.error(messageCreate.content)
			})
			.then(async () => {
				await db.push(`swear_${messageCreate.author.id}_${messageCreate.guild.id}_${messageCreate.channel.id}_${defaultFormatCurrentTime}`, `${messageCreate.content}`)
				// I know that this should already be a string, but there have been instances where errors still popped up and this just solved it.
				return messageCreate.channel.send("Please do not use such words here!")
			})
		}
		// warn system
	}
}

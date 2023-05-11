const env = require("dotenv").config()
module.exports = async (bot, messageUpdate) => {
	// add some stuff like anti-swear
	bot.utils.get("antiswear").execute(messageUpdate)
	if(messageUpdate.content) return bot.utils.get("tokensecurity").execute(messageUpdate)
}

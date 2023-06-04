const { Default } = require("../../../../config.json")
const { EmbedBuilder } = require("discord.js")
const { sfwRedditRequest, sfwRedditCheck, getSfwRedditPost } = require("../../../functions/reddit/sfw.js")
const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "reddit",
	aliases: [],
	category: "utility",
	utilisation: "reddit <subreddit>",
	desc: "Extracts random post from specified subreddit. This may not work if post is nsfw, private or deleted.",
	maxargs: 1,
	async execute(messageCreate, args, prefix) {
		if(!args[0]) return messageCreate.channel.send(reject.UserFault.args.missing)
		if(args[0].startsWith("r/")) args[0].replace("r/", "")
		let sfwSubredditStatus = await sfwRedditCheck(args[0])
		if(sfwSubredditStatus === "nsfw") return messageCreate.channel.send("The subreddit is nsfw! I will not be scraping from here!")
		let sfwPost = await getSfwRedditPost(args[0])
		let redditEmbed = new EmbedBuilder()
		redditEmbed.setTitle(sfwPost.title)
		redditEmbed.setURL(`https://reddit.com${sfwPost.permalink}`)
		redditEmbed.setDescription(`👍 ${sfwPost.ups} | 👎 ${sfwPost.downs} | 💬 ${sfwPost.comments}`)
		redditEmbed.setColor(Default.DefaultEmbedColor)
		redditEmbed.setFooter({ text: Default.DefaultFooterText })
		redditEmbed.setTimestamp()
		if(sfwPost.url)redditEmbed.setImage(sfwPost.url)
		messageCreate.channel.send({ embeds: [redditEmbed] })
	}
}

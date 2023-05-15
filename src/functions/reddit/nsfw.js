// I hate horni, but that said there are some posts about human anatomy that require nsfw tags so here we are
const axios = require("axios")
function getNsfwRedditPost(subreddit) {
	const nsfwGetPostRequest = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/random.json`
	}
	axios(nsfwGetPostRequest).then((response) => {
		return response.data[0].data.children[0].data
	})
}

module.exports = { getNsfwRedditPost }

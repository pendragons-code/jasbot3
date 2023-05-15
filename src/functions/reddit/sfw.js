const axios = require("axios")
function sfwRedditCheck(subreddit) {
	const sfwCheck = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/about.json`
	}
	axios(sfwCheck).then((response) => {
		let subDetails = response.data.data
		if(subDetails.over18) return "nsfw"
	})
}

function getSfwRedditPost(subreddit) {
	const sfwRedditRequest = {
		method: "GET",
		url: `https://reddit.com/r/${subreddit}/random.json`
	}
	axios(sfwRedditRequest).then((response) => {
		let resultSfwPostData = response.data[0].data.children[0].data
		if(resultSfwPostData.over18) return getSfwRedditPost(subreddit) // call again if post is nsfw
		return resultSfwPostData
	})
}

module.exports = { sfwRedditCheck, getSfwRedditPost }

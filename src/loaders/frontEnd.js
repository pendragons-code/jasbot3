const { readdirSync } = require("fs")
const express = require("express")
const routeFrontEnd = express.Router()
const { rateLimit } = require("express-rate-limit")
const { frontEndRateLimit } = require("../../assets/rateLimit/rateLimit.json")

const limiter = rateLimit({
	windowMs: frontEndRateLimit.windowMinutes * 60000,
	max: frontEndRateLimit.maxWindowRequest,
	standardHeaders: frontEndRateLimit.standardHeaders,
	legacyHeaders: frontEndRateLimit.legacyHeaders,
	message: frontEndRateLimit.message
})

routeFrontEnd.use(limiter)
const loadFrontEndPageLoader = readdirSync("./src/webserver/frontend/pageLoader").filter(file => file.endsWith(".js"))
for(file of loadFrontEndPageLoader) {
	const { execute, name } = require(`../webserver/frontend/pageLoader/${file}`)
	routeFrontEnd.get(`/${name}`, async (req, res) => {
		execute(req, res)
	})
}

module.exports = routeFrontEnd

const express = require("express")
const helmet = require("helmet")
const { join } = require("path")
const app = express()

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.port || 3000
const frontEnd = require("./frontEnd.js")
const http = require("http")
const server = http.createServer(app)

if(!port) console.log("Port is empty and will be assumed to be 3000!")

app.use(function(req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';")
	next()
})

app.use("/", frontEnd)
app.set("view engine", "ejs")
app.set("views", join(__dirname, "../webserver/frontend/views"))
app.use(express.static(join(__dirname, "../webserver/frontend/public")))
app.use(helmet())
app.use(function(req, res) {
	res.render("404.ejs")
})
server.listen((port), async () => {
	console.log(`[Webserver]: Webserver up! http://localhost:${port}`)
})

module.exports = { server }
// exporting this and not making this global because the chances of someone naming a discord.js-related variable server is very high, while it is bad practice on that person's end, im just taking steps to avoid it.

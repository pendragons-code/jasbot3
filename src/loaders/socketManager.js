const { server } = require("./webserver.js")
const { readdirSync } = require("fs")
const socket = require("socket.io")
const io = socket(server)

const loadSocketDirs = readdirSync("./src/webserver/socketEvents")
io.on("connection", (socket) => {
	for(dirs of loadSocketDirs) {
		const loadSocketFile = readdirSync(`./src/webserver/socketEvents`).filter(files => files.endsWith(".js"))
		for(file of loadSocketFile) {
			const { name, execute } = require(`../webserver/socketEvents/${dirs}/${file}`)
			socket.on(name, (Input) => {
				execute(Input, socket, io)
			})
		}
	}
})

module.exports = { io }
// who would name a variable io and while a global variable is named io right?
// right?
//
// well 3 am me apparently. I named an Input Output monitor component io for another project, unaware someone made a global variable named io.
//
// It took 4 hours of looking through commits. I swear I wanted to die.

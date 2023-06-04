const reject = require("../../../../assets/responseComponents/rejection.json")
module.exports = {
	name: "findmax",
	aliases: [],
	category: "utility",
	utilisation: "findmax <numbers sepatated by spaces>\nfindmax 1 2 3",
	desc: "Returns that highest numerical value from the provided set",
	async execute(messageCreate, args, prefix) {
		if(!args[1]) return messageCreate.channel.send(`${reject.UserFault.numbers.missing}\nYou also need at least 2 numbers!`)
		args.every(element => {
			if(typeof element != "number") return messageCreate.channel.send(reject.UserFault.numbers.missing)
		})
		return messageCreate.channel.send(Math.max(args))
	}
}

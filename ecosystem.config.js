module.exports = {
	apps: [{
		name: "Jasbot (version 3)",
		script: "./src/loaders/bot.js",
		env_production: {
			NODE_ENV: "production"
		},
		end_development: {
			NODE_ENV: "development"
		}
	}]
}

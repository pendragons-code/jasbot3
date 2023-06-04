module.exports = {
	apps: [{
		name: "Jasbot (version 3)",
		script: "./src/loaders/bot.js",
		env_production: {
			NODE_ENV: "production"
		},
		end_development: {
			NODE_ENV: "development"
		},
		watch_delay: 1000,
		ignore_watch: ["node_modules"]
	}]
}

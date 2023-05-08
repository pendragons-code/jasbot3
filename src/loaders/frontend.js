const { readdirSync } = require("fs")
const express = require("express")
const routeFrontEnd = express.Router()
const { rateLimit } = require("express-rate-limit")
const { frontEndRateLimit } = require("../../assets/rateLimit/rateLimit.json")

// I like to keep front end and back end rate limit separate, especially if I intended to make a creator only dashboard.
// Basically there will also be an auth system, where the password is sent to the user and the user will use that to modify the server settings.
// I am gonna avoid using discord's own auth because I don't wanna handle a discord account.
// Since Jasbot's dashboard is not highly secure and stuff, I rather use an OTP and not actually getting a discord user to log in.
// That said, it is primrily due to my lack of experience on the web dev end and the fact that I really don't actually have time for this ever since I got into poly
// This is also related to one regret I have, If i did not take a part time job for the second term, I might not have so little time to go for the things I enjoyed doing.


// Basically this guarentees more safety for the user and I will probably change this.

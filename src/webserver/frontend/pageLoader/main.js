let greet = ["ᓚᘏᗢ", "/ᐠ. ｡.ᐟ\\ ᵐᵉᵒʷˎˊ˗", "Hello World!", "Pendragon's code!", "/ᐠ - ˕ -マ Ⳋ", "/\\___/\\<br>_____(=0 - 0=)_____<br>U  U", "ฅ^._.^ฅ", " ∧,,,,,∧<br>(  ̳• · • ̳)<br>/    づ♡", ">^•-•^<", "/ᐠ •ヮ• マ Ⳋ", "^•ﻌ•^ฅ♡", "/ᐠ｡ꞈ｡マ", "ᓚᘏᗢ ♡ ᗢᘏᓗ", "₍^ >ヮ<^₎", "/ᐠ_ ꞈ _ᐟ\\", "/) /)<br>( . .)<br></>( ><)"]
let quotes = ["\"I like 8 bit art!\" - Pendragon's code", "\"Whoso pulleth out this sword of this stone and anvil, is rightwise king born of all England.\" - Sir Thomas Malory", "\"The sweetness of love is short-lived, but the pain endures.\" - Sir Thomas Malory", "\"We shall now seek that which we shall not find.\" - Sir Thomas Malory", "\"Nay, I may not so, for I have promised to do the battle to the uttermost by the faith of my body, while me lasteth the life, and therefore I had liefer to die with honour than to live with shame; and if it were possible for me to die an hundred times, I had liefer to die so oft than yield me to thee; for though I lack weapon, I shall lack no worship, and if thou slay me weaponless that shall be thy shame.\" - King Arthur to Sir Accolon, Sir Thomas Malory"]
const getRandomQuote = quotes[Math.floor(Math.random() * quotes.length)]
const getRandomGreet = greet[Math.floor(Math.random() * greet.length)]
module.exports = {
	name: "/",
	async execute(req, res) {
		return res.render("index.ejs", { randomGreet: getRandomGreet, quote: getRandomQuote })
	}
}

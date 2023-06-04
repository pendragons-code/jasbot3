const degree = require("../../../commands/messageCommands/angles/degree")

// standard = "metre"
function convertDistance(queriedAmt, unit) {
	let metre = ""
	switch(unit) {
		case "metre":
			metre = queriedAmt
			break
		case "kilometre":
			metre = queriedAmt * 1000
			break
		case "centimetre":
			metre = queriedAmt / 100
			break
		case "millimetre":
			metre = queriedAmt / 1000
			break
		case "micrometre":
			metre = queriedAmt / 1e+6
			break
		case "nanometre":
			metre = queriedAmt / 1e+9
			break
		case "mile":
			metre = queriedAmt * 1609.34
			break
		case "yard":
			metre = queriedAmt * 0.9144
			break
		case "foot":
			metre = queriedAmt * 0.3048
			break
		case "inch":
			metre = queriedAmt * 0.0254
			break
		case "nauticalMile":
			metre = queriedAmt * 1852
			break
	}
	let centimetre = ( unit == "centimetre" ) ? queriedAmt : metre * 100
	let kilometre = ( unit == "kilometre" ) ? queriedAmt : metre / 1000
	let millimetre = ( unit == "millimetre" ) ? queriedAmt : metre * 1000
	let micrometre = ( unit == "micrometre" ) ? queriedAmt : metre * 1e + 6
	let nanometre = ( unit == "nanometre" ) ? queriedAmt : metre * 1e + 9
	let mile = ( unit == "mile") ? queriedAmt : metre * 1609.34
	let yard = ( unit == "yard" ) ? queriedAmt : metre * 0.9144
	let foot = ( unit == "foot" ) ? queriedAmt : metre * 0.3048
	let inch = ( unit == "inch" ) ? queriedAmt : metre * 0.0254
	let nauticalMile = (unit == "nauticalMile") ? queriedAmt : metre * 1852
	return `centimetre: ${centimetre}\nmetre: ${metre}\nkilometre: ${kilometre}\nmillimetre: ${millimetre}\nnanometre: ${nanometre}\nmile: ${mile}\nyard: ${yard}\nfoot: ${foot}\ninch: ${inch}\nnautical mile:${nauticalMile}`
}

module.exports = { convertDistance }

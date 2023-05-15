// I know that people are gonna advice against doing this, because i already have been
// but basically if i convert all values into degrees it will just convert from there :. less work

function convertAngles(queriedAmt, unit) {
	let degree = ""
	switch(unit) {
		case "degrees":
			degree = queriedAmt
			break
		case "radian":
			degree = queriedAmt * 180 / Math.PI
			break
		case "arcsecond":
			degree = queriedAmt / 3600
			break
		case "gradian":
			degree = queriedAmt * 180 / 200
			break
		case "milliradian":
			degree = queriedAmt * 180 / (1000 * Math.PI)
			break
		case "arcminute":
			degree = queriedAmt / 60
			break
	}

	let radian = (unit == "radian") ? queriedAmt : degree * (Math.PI / 180)
	let gradian = (unit == "gradian") ? queriedAmt : degree * (200/180)
	let milliradian = (unit == "milliradian") ? queriedAmt : radian * 1000
	let minuteOfArc = (unit == "arcminute") ? queriedAmt : degree * 60
	let secondOfArc = (unit == "arcsecond") ? queriedAmt : degree * 3600
	return `radian: ${radian.toPrecision(5)}\ngradian: ${gradian.toPrecision(5)}\nmilliradian: ${milliradian.toPrecision(5)}\nminute of arc: ${minuteOfArc.toPrecision(5)}\nsecondOfArc: ${secondOfArc.toPrecision(5)}`
}

module.exports = { convertAngles }

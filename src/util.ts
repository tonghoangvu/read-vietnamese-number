function trimLeft(str: string, char: string): string {
	if (str === '') return ''
	let pos = 0
	while (str[pos] === char[0]) pos++
	return str.substring(pos)
}

function trimRight(str: string, char: string): string {
	if (str === '') return ''
	let lastPos = str.length - 1
	while (str[lastPos] === char[0]) lastPos--
	return str.substring(0, lastPos + 1)
}

function splitToDigits(str: string): number[] {
	return str.split('').map((digit) => parseInt(digit))
}

export { trimLeft, trimRight, splitToDigits }

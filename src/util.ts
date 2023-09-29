import { Digit, InputNumber, InvalidFormatError } from './type.js'

export function trimLeft(str: string, char: string): string {
	if (str === '') {
		return ''
	}
	let pos = 0
	while (str[pos] === char[0]) {
		pos++
	}
	return str.substring(pos)
}

export function trimRight(str: string, char: string): string {
	if (str === '') {
		return ''
	}
	let lastPos = str.length - 1
	while (str[lastPos] === char[0]) {
		lastPos--
	}
	return str.substring(0, lastPos + 1)
}

export function splitToDigits(str: string): Digit[] | null {
	const digits = str.split('').map((digit) => {
		const value = parseInt(digit, 10)
		return isNaN(value) || value < 0 || value > 9 ? null : value
	})
	return digits.includes(null) ? null : (digits as Digit[])
}

export function validateNumber(value: InputNumber): string {
	switch (typeof value) {
		case 'string': {
			return value
		}
		case 'bigint': {
			return value.toString()
		}
		default: {
			// Throw error on number, object, undefined, boolean, symbol, function
			// Some numbers may cause errors when in parsing process:
			// - Loss precision: Number.isInteger(value) && !Number.isSafeInteger(value)
			// - Cannot parse scientific notation: value.toString().includes('e')
			throw new InvalidFormatError('Invalid format')
		}
	}
}

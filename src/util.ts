import { InputNumber, InvalidFormatError } from './type'

function trimLeft(str: string, char: string): string {
	if (str === '') {
		return ''
	}
	let pos = 0
	while (str[pos] === char[0]) {
		pos++
	}
	return str.substring(pos)
}

function trimRight(str: string, char: string): string {
	if (str === '') {
		return ''
	}
	let lastPos = str.length - 1
	while (str[lastPos] === char[0]) {
		lastPos--
	}
	return str.substring(0, lastPos + 1)
}

function splitToDigits(str: string): number[] {
	return str.split('').map((digit) => parseInt(digit))
}

function validateNumber(value: InputNumber): string {
	// String type in TS maybe number at runtime
	switch (typeof value) {
		case 'string': {
			return value
		}
		case 'bigint': {
			// BigInt is integer, not float
			return value.toString()
		}
		case 'number': {
			throw new InvalidFormatError()
			/**
			 * SOME NUMBERS MAY CAUSE ERRORS
			 * - Loss precision
			 * 		Number.isInteger(value) && !Number.isSafeInteger(value)
			 * - Cannot parse in scientific notation
			 * 		value.toString().includes('e')
			 */
		}
		case 'object': {
			// Check for nullable strings
			if (value === null) {
				throw new InvalidFormatError()
			}
			return (value as object).toString()
		}
		default: {
			// Typeof is undefined, boolean, symbol, function
			throw new InvalidFormatError()
		}
	}
}

export { trimLeft, trimRight, splitToDigits, validateNumber }

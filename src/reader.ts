import {
	Digit,
	InputNumber,
	InvalidNumberError,
	NotEnoughUnitError,
	NumberData,
	Period,
	ReadingConfig,
} from './type.js'
import { splitToDigits, trimLeft, trimRight, validateNumber } from './util.js'

export function readLastTwoDigits(config: ReadingConfig, b: Digit, c: Digit): string[] {
	const output: string[] = []
	switch (b) {
		case 0: {
			output.push(config.digits[c])
			break
		}
		case 1: {
			output.push(config.tenText)
			if (c === 5) {
				output.push(config.fiveToneText)
			} else if (c !== 0) {
				output.push(config.digits[c])
			}
			break
		}
		default: {
			output.push(config.digits[b], config.tenToneText)
			if (c === 1) {
				output.push(config.oneToneText)
			} else if (c === 4) {
				output.push(config.fourToneText)
			} else if (c === 5) {
				output.push(config.fiveToneText)
			} else if (c !== 0) {
				output.push(config.digits[c])
			}
			break
		}
	}
	return output
}

export function readThreeDigits(
	config: ReadingConfig,
	a: Digit,
	b: Digit,
	c: Digit,
	readZeroHundred: boolean
): string[] {
	const output: string[] = []
	const hasHundred = a !== 0 || readZeroHundred
	if (hasHundred) {
		output.push(config.digits[a], config.hundredText)
	}
	if (hasHundred && b === 0) {
		if (c === 0) {
			return output
		}
		output.push(config.oddText)
	}
	output.push(...readLastTwoDigits(config, b, c))
	return output
}

export function removeThousandsSeparators(config: ReadingConfig, number: string): string {
	const regex = new RegExp(config.thousandSign, 'g')
	return number.replace(regex, '')
}

export function trimRedundantZeros(config: ReadingConfig, number: string): string {
	return number.includes(config.pointSign)
		? trimLeft(trimRight(number, config.filledDigit), config.filledDigit)
		: trimLeft(number, config.filledDigit)
}

export function addLeadingZerosToFitPeriod(config: ReadingConfig, number: string): string {
	const newLength = Math.ceil(number.length / config.periodSize) * config.periodSize
	return number.padStart(newLength, config.filledDigit)
}

export function zipIntegralPeriods(config: ReadingConfig, digits: Digit[]): Period[] {
	const output: Period[] = []
	const periodCount = Math.ceil(digits.length / config.periodSize)
	for (let i = 0; i < periodCount; i++) {
		const [a, b, c] = digits.slice(i * config.periodSize, (i + 1) * config.periodSize)
		output.push([a, b, c])
	}
	return output
}

export function parseNumberData(config: ReadingConfig, number: string): NumberData {
	let numberString = removeThousandsSeparators(config, number)

	const isNegative = numberString.startsWith(config.negativeSign)
	numberString = isNegative ? numberString.substring(config.negativeSign.length) : numberString
	numberString = trimRedundantZeros(config, numberString)

	const pointPos = numberString.indexOf(config.pointSign)
	let integralString = pointPos === -1 ? numberString : numberString.substring(0, pointPos)
	const fractionalString = pointPos === -1 ? '' : numberString.substring(pointPos + 1)
	integralString = addLeadingZerosToFitPeriod(config, integralString)

	const integralDigits = splitToDigits(integralString)
	const fractionalDigits = splitToDigits(fractionalString)
	if (integralDigits === null || fractionalDigits === null) {
		throw new InvalidNumberError('Invalid number')
	}

	const integralPart = zipIntegralPeriods(config, integralDigits)
	if (integralPart.length === 0) {
		integralPart.push([0, 0, 0])
	} else if (integralPart.length > config.units.length) {
		throw new NotEnoughUnitError('Unit not enough')
	}
	const fractionalPart = fractionalDigits
	return { isNegative, integralPart, fractionalPart }
}

export function readIntegralPart(config: ReadingConfig, periods: Period[]): string[] {
	const output: string[] = []
	const isSinglePeriod = periods.length === 1
	for (const [index, period] of periods.entries()) {
		const isFirstPeriod = index === 0
		const [a, b, c] = period
		if (a !== 0 || b !== 0 || c !== 0 || isSinglePeriod) {
			output.push(
				...readThreeDigits(config, a, b, c, !isFirstPeriod),
				...config.units[periods.length - 1 - index]
			)
		}
	}
	return output
}

export function readFractionalPart(config: ReadingConfig, digits: Digit[]): string[] {
	const output: string[] = []
	switch (digits.length) {
		case 2: {
			const [b, c] = digits
			output.push(...readLastTwoDigits(config, b, c))
			break
		}
		case 3: {
			const [a, b, c] = digits
			output.push(...readThreeDigits(config, a, b, c, true))
			break
		}
		default: {
			for (const digit of digits) {
				output.push(config.digits[digit])
			}
			break
		}
	}
	return output
}

export function readNumber(config: ReadingConfig, numberData: NumberData): string {
	const output: string[] = []
	output.push(...readIntegralPart(config, numberData.integralPart))
	if (numberData.fractionalPart.length !== 0) {
		output.push(config.pointText, ...readFractionalPart(config, numberData.fractionalPart))
	}
	if (numberData.isNegative) {
		output.unshift(config.negativeText)
	}
	output.push(...config.unit)
	return output.join(config.separator)
}

export function doReadNumber(config: ReadingConfig, number: InputNumber) {
	const validatedNumber = validateNumber(number)
	const numberData = parseNumberData(config, validatedNumber)
	return readNumber(config, numberData)
}

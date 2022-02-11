import {
	Period,
	InvalidNumberError,
	UnitNotEnoughError,
	NumberData,
	ReadingConfig,
} from './type'
import { splitToDigits, trimLeft, trimRight } from './util'

function readLastTwoDigits(
	config: ReadingConfig,
	b: number,
	c: number,
): string[] {
	const output: string[] = []
	switch (b) {
		case 0: {
			output.push(config.digits[c])
			break
		}
		case 1: {
			output.push(config.tenText)
			if (c === 5) output.push(config.fiveToneText)
			else if (c !== 0) output.push(config.digits[c])
			break
		}
		default: {
			output.push(config.digits[b], config.tenToneText)
			if (c === 1) output.push(config.oneToneText)
			else if (c === 4) output.push(config.fourToneText)
			else if (c === 5) output.push(config.fiveToneText)
			else if (c !== 0) output.push(config.digits[c])
			break
		}
	}
	return output
}

function readThreeDigits(
	config: ReadingConfig,
	a: number,
	b: number,
	c: number,
	readZeroHundred: boolean,
): string[] {
	const output: string[] = []

	const hasHundred = a !== 0 || readZeroHundred
	if (hasHundred) output.push(config.digits[a], config.hundredText)

	if (hasHundred && b === 0) {
		if (c === 0) return output
		output.push(config.oddText)
	}

	output.push(...readLastTwoDigits(config, b, c))
	return output
}

function trimRedundantZeros(config: ReadingConfig, number: string): string {
	return number.includes(config.pointSign)
		? trimLeft(trimRight(number, config.filledDigit), config.filledDigit)
		: trimLeft(number, config.filledDigit)
}

function addLeadingZerosToFitPeriod(
	config: ReadingConfig,
	number: string,
): string {
	const newLength =
		Math.ceil(number.length / config.periodSize) * config.periodSize
	return number.padStart(newLength, config.filledDigit)
}

function zipIntegralPeriods(config: ReadingConfig, digits: number[]): Period[] {
	const output: Period[] = []
	const periodCount = Math.ceil(digits.length / config.periodSize)
	for (let i = 0; i < periodCount; i++) {
		const [a, b, c] = digits.slice(
			i * config.periodSize,
			(i + 1) * config.periodSize,
		)
		output.push([a, b, c])
	}
	return output
}

function parseNumberData(config: ReadingConfig, number: string): NumberData {
	const isNegative = number[0] === config.negativeSign
	let numberString = isNegative ? number.substring(1) : number
	numberString = trimRedundantZeros(config, numberString)

	const pointPos = numberString.indexOf(config.pointSign)
	let integralString =
		pointPos === -1 ? numberString : numberString.substring(0, pointPos)
	const fractionalString =
		pointPos === -1 ? '' : numberString.substring(pointPos + 1)
	integralString = addLeadingZerosToFitPeriod(config, integralString)

	const integralDigits = splitToDigits(integralString)
	const fractionalDigits = splitToDigits(fractionalString)
	if (integralDigits.includes(NaN) || fractionalDigits.includes(NaN))
		throw new InvalidNumberError()

	const integralPart = zipIntegralPeriods(config, integralDigits)
	if (integralPart.length === 0) integralPart.push([0, 0, 0])
	else if (integralPart.length > config.units.length)
		throw new UnitNotEnoughError()
	const fractionalPart = fractionalDigits

	return { isNegative, integralPart, fractionalPart }
}

function readIntegralPart(config: ReadingConfig, periods: Period[]): string[] {
	const output: string[] = []
	const isSinglePeriod = periods.length === 1
	for (const [index, period] of periods.entries()) {
		const isFirstPeriod = index === 0
		const [a, b, c] = period
		if (a !== 0 || b !== 0 || c !== 0 || isSinglePeriod)
			output.push(
				...readThreeDigits(config, a, b, c, !isFirstPeriod),
				...config.units[periods.length - 1 - index],
			)
	}
	return output
}

function readFractionalPart(config: ReadingConfig, digits: number[]): string[] {
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
			for (const digit of digits) output.push(config.digits[digit])
			break
		}
	}
	return output
}

function readNumber(config: ReadingConfig, numberData: NumberData): string {
	const output: string[] = []

	output.push(...readIntegralPart(config, numberData.integralPart))
	if (numberData.fractionalPart.length !== 0)
		output.push(
			config.pointText,
			...readFractionalPart(config, numberData.fractionalPart),
		)

	if (numberData.isNegative) output.unshift(config.negativeText)
	output.push(...config.unit)

	return output.join(config.separator)
}

export {
	readLastTwoDigits,
	readThreeDigits,
	trimRedundantZeros,
	addLeadingZerosToFitPeriod,
	zipIntegralPeriods,
	parseNumberData,
	readIntegralPart,
	readFractionalPart,
	readNumber,
}

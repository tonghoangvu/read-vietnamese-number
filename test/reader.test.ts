import { describe, it, expect } from '@jest/globals'

import {
	InputNumber,
	InvalidFormatError,
	InvalidNumberError,
	UnitNotEnoughError,
	NumberData,
	ReadingConfig,
} from '../src/type'
import { validateNumber } from '../src/util'
import {
	readLastTwoDigits,
	readThreeDigits,
	removeThousandsSeparators,
	trimRedundantZeros,
	addLeadingZerosToFitPeriod,
	zipIntegralPeriods,
	parseNumberData,
	readIntegralPart,
	readFractionalPart,
	readNumber,
} from '../src/reader'

describe('Read the last two digits function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should return value', () => {
		expect(readLastTwoDigits(config, 0, 0)).toEqual(['không'])
		expect(readLastTwoDigits(config, 0, 3)).toEqual(['ba'])

		expect(readLastTwoDigits(config, 1, 5)).toEqual(['mười', 'lăm'])
		expect(readLastTwoDigits(config, 1, 6)).toEqual(['mười', 'sáu'])
		expect(readLastTwoDigits(config, 1, 0)).toEqual(['mười'])

		expect(readLastTwoDigits(config, 5, 1)).toEqual(['năm', 'mươi', 'mốt'])
		expect(readLastTwoDigits(config, 5, 4)).toEqual(['năm', 'mươi', 'tư'])
		expect(readLastTwoDigits(config, 4, 4)).toEqual(['bốn', 'mươi', 'tư'])
		expect(readLastTwoDigits(config, 8, 5)).toEqual(['tám', 'mươi', 'lăm'])
		expect(readLastTwoDigits(config, 8, 2)).toEqual(['tám', 'mươi', 'hai'])
		expect(readLastTwoDigits(config, 8, 0)).toEqual(['tám', 'mươi'])
	})
})

describe('Read three digits function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should return without zero hundred', () => {
		expect(readThreeDigits(config, 0, 0, 0, false)).toEqual(['không'])
		expect(readThreeDigits(config, 0, 0, 5, false)).toEqual(['năm'])
		expect(readThreeDigits(config, 3, 0, 0, false)).toEqual(['ba', 'trăm'])
		expect(readThreeDigits(config, 3, 0, 5, false)).toEqual([
			'ba',
			'trăm',
			'lẻ',
			'năm',
		])
	})

	it('Should return with zero hundred', () => {
		expect(readThreeDigits(config, 0, 0, 0, true)).toEqual(['không', 'trăm'])
		expect(readThreeDigits(config, 3, 0, 0, true)).toEqual(['ba', 'trăm'])
		expect(readThreeDigits(config, 0, 0, 5, true)).toEqual([
			'không',
			'trăm',
			'lẻ',
			'năm',
		])
		expect(readThreeDigits(config, 3, 0, 5, true)).toEqual([
			'ba',
			'trăm',
			'lẻ',
			'năm',
		])
	})
})

describe('Remove thousands separators function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should not contain any thousands separators', () => {
		expect(removeThousandsSeparators(config, '123.456')).toBe('123.456')
		expect(removeThousandsSeparators(config, '1,234,567.89')).toBe('1234567.89')
		expect(removeThousandsSeparators(config, '1,234.567,89')).toBe('1234.56789')
	})

	it('Should work even if thousands separators are invalid', () => {
		expect(removeThousandsSeparators(config, '1,2,3456,7')).toBe('1234567')
		expect(removeThousandsSeparators(config, '123.4,567,89')).toBe('123.456789')
	})
})

describe('Trim redundant zeros function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should not trim', () => {
		expect(trimRedundantZeros(config, '')).toBe('')
	})

	it('Should only trim left', () => {
		expect(trimRedundantZeros(config, '0')).toBe('')
		expect(trimRedundantZeros(config, '000123')).toBe('123')
		expect(trimRedundantZeros(config, '00012300')).toBe('12300')
	})

	it('Should trim both left and right', () => {
		expect(trimRedundantZeros(config, '123.4')).toBe('123.4')
		expect(trimRedundantZeros(config, '0123.0004')).toBe('123.0004')
		expect(trimRedundantZeros(config, '001230.004500')).toBe('1230.0045')
	})
})

describe('Add leading zeros to fit period function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should not change', () => {
		expect(addLeadingZerosToFitPeriod(config, '')).toBe('')
		expect(addLeadingZerosToFitPeriod(config, '257')).toBe('257')
		expect(addLeadingZerosToFitPeriod(config, '123456')).toBe('123456')
	})

	it('Should have the length divisible by 3', () => {
		expect(addLeadingZerosToFitPeriod(config, '1')).toBe('001')
		expect(addLeadingZerosToFitPeriod(config, '23')).toBe('023')
		expect(addLeadingZerosToFitPeriod(config, '1234')).toBe('001234')
		expect(addLeadingZerosToFitPeriod(config, '12345')).toBe('012345')
	})
})

describe('Zip integral digits function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should return no period', () => {
		expect(zipIntegralPeriods(config, [])).toEqual([])
	})

	it('Should return one period with zeros', () => {
		expect(zipIntegralPeriods(config, [1, 2, 3])).toEqual([[1, 2, 3]])
		expect(zipIntegralPeriods(config, [1, 2, 3, 4, 5, 6])).toEqual([
			[1, 2, 3],
			[4, 5, 6],
		])
	})
})

describe('Parse number data function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should throw InvalidNumberError', () => {
		expect(() => parseNumberData(config, '-1.23xy')).toThrowError(
			InvalidNumberError
		)
		expect(() => parseNumberData(config, '-12..3')).toThrowError(
			InvalidNumberError
		)
		expect(() => parseNumberData(config, '--12.34')).toThrowError(
			InvalidNumberError
		)
	})

	it('Should throw UnitNotEnoughError', () => {
		expect(() =>
			parseNumberData(config, '1234567890123456789012')
		).toThrowError(UnitNotEnoughError)
		expect(() =>
			parseNumberData(config, '123456789012345678901')
		).not.toThrowError(UnitNotEnoughError)
		expect(() =>
			parseNumberData(config, '123456789012345678901.123456789')
		).not.toThrowError(UnitNotEnoughError)
	})

	it('Should return empty data', () => {
		expect(parseNumberData(config, '')).toEqual({
			isNegative: false,
			integralPart: [[0, 0, 0]],
			fractionalPart: [],
		} as NumberData)
	})

	it('Should return value', () => {
		expect(parseNumberData(config, '123')).toEqual({
			isNegative: false,
			integralPart: [[1, 2, 3]],
			fractionalPart: [],
		} as NumberData)
		expect(parseNumberData(config, '-12.3')).toEqual({
			isNegative: true,
			integralPart: [[0, 1, 2]],
			fractionalPart: [3],
		} as NumberData)
		expect(parseNumberData(config, '0031.141590000')).toEqual({
			isNegative: false,
			integralPart: [[0, 3, 1]],
			fractionalPart: [1, 4, 1, 5, 9],
		} as NumberData)
		expect(parseNumberData(config, '-0031.141590000')).toEqual({
			isNegative: true,
			integralPart: [[0, 3, 1]],
			fractionalPart: [1, 4, 1, 5, 9],
		} as NumberData)
		expect(parseNumberData(config, '-123,456,789.012,345')).toEqual({
			isNegative: true,
			integralPart: [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			],
			fractionalPart: [0, 1, 2, 3, 4, 5],
		} as NumberData)
		expect(parseNumberData(config, '12,3,4567.8,9')).toEqual({
			isNegative: false,
			integralPart: [
				[0, 0, 1],
				[2, 3, 4],
				[5, 6, 7],
			],
			fractionalPart: [8, 9],
		} as NumberData)
	})
})

describe('Read integral part function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should return empty', () => {
		expect(readIntegralPart(config, [])).toEqual([])
	})

	it('Should return value', () => {
		expect(readIntegralPart(config, [[0, 0, 0]])).toEqual(['không'])
		expect(readIntegralPart(config, [[1, 0, 3]])).toEqual([
			'một',
			'trăm',
			'lẻ',
			'ba',
		])
		expect(
			readIntegralPart(config, [
				[0, 1, 5],
				[7, 2, 5],
			])
		).toEqual(['mười', 'lăm', 'nghìn', 'bảy', 'trăm', 'hai', 'mươi', 'lăm'])
		expect(
			readIntegralPart(config, [
				[6, 2, 3],
				[0, 0, 0],
			])
		).toEqual(['sáu', 'trăm', 'hai', 'mươi', 'ba', 'nghìn'])
	})
})

describe('Read fractional part function', () => {
	const config = new ReadingConfig()
	config.unit = []

	it('Should return empty value', () => {
		expect(readFractionalPart(config, [])).toEqual([])
	})

	it('Should return value', () => {
		expect(readFractionalPart(config, [1])).toEqual(['một'])
		expect(readFractionalPart(config, [2, 4])).toEqual(['hai', 'mươi', 'tư'])
		expect(readFractionalPart(config, [3, 0, 9])).toEqual([
			'ba',
			'trăm',
			'lẻ',
			'chín',
		])
		expect(readFractionalPart(config, [0, 0, 0, 7])).toEqual([
			'không',
			'không',
			'không',
			'bảy',
		])
		expect(readFractionalPart(config, [1, 2, 3, 4, 5])).toEqual([
			'một',
			'hai',
			'ba',
			'bốn',
			'năm',
		])
	})
})

describe('Read full string number', () => {
	const func = (config: ReadingConfig, number: InputNumber) => {
		const validatedNumber = validateNumber(number)
		const numberData = parseNumberData(config, validatedNumber)
		return readNumber(config, numberData)
	}
	const config = new ReadingConfig()
	config.unit = []

	it('Should throw InvalidFormatError', () => {
		expect(() => func(config, 0)).toThrowError(InvalidFormatError)
		expect(() => func(config, -12345)).toThrowError(InvalidFormatError)
		expect(() => func(config, 0.000000000012345)).toThrowError(
			InvalidFormatError
		)
		// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
		expect(() => func(config, -1234567890123456789012)).toThrowError(
			InvalidFormatError
		)
	})

	it('Should throw InvalidNumberError', () => {
		expect(() => func(config, '1..23')).toThrowError(InvalidNumberError)
		expect(() => func(config, '--1.23')).toThrowError(InvalidNumberError)
		expect(() => func(config, '12_3')).toThrowError(InvalidNumberError)
		expect(() => func(config, 'abc123')).toThrowError(InvalidNumberError)
	})

	it('Should throw UnitNotEnoughError', () => {
		expect(() => func(config, '1234567890123456789012')).toThrowError(
			UnitNotEnoughError
		)
		expect(() => func(config, '123456789012345678901')).not.toThrowError(
			UnitNotEnoughError
		)
		expect(() =>
			func(config, '123456789012345678901.123456789')
		).not.toThrowError(UnitNotEnoughError)
	})

	it('Should return zero', () => {
		expect(func(config, '')).toBe('không')
		expect(func(config, '0')).toBe('không')
		expect(func(config, '000')).toBe('không')
		expect(func(config, '00.')).toBe('không')
		expect(func(config, '.00')).toBe('không')
		expect(func(config, '000.00')).toBe('không')
	})

	it('Should return integer value', () => {
		expect(func(config, '02')).toBe('hai')
		expect(func(config, '15')).toBe('mười lăm')
		expect(func(config, '4065')).toBe('bốn nghìn không trăm sáu mươi lăm')
		expect(func(config, '06000')).toBe('sáu nghìn')
		expect(func(config, '1000024')).toBe('một triệu không trăm hai mươi tư')
		expect(func(config, '23010000')).toBe(
			'hai mươi ba triệu không trăm mười nghìn'
		)
		expect(func(config, '2030000305')).toBe(
			'hai tỉ không trăm ba mươi triệu ba trăm lẻ năm'
		)
		expect(func(config, '00,123,456')).toBe(
			'một trăm hai mươi ba nghìn bốn trăm năm mươi sáu'
		)
	})

	it('Should return double value', () => {
		expect(func(config, '304.23')).toBe('ba trăm lẻ bốn chấm hai mươi ba')
		expect(func(config, '-0003.804')).toBe('âm ba chấm tám trăm lẻ bốn')
		expect(func(config, '-0.00001')).toBe(
			'âm không chấm không không không không một'
		)
		expect(func(config, '-123,456.7,89')).toBe(
			'âm một trăm hai mươi ba nghìn bốn trăm năm mươi sáu chấm bảy trăm tám mươi chín'
		)
	})
})

import { NumberData } from './NumberData'
import { ReadingConfig } from './ReadingConfig'
import { Period } from './types'
import { trimLeft, trimRight } from './Utils'

/**
 * Đọc hai chữ số cuối trong nhóm 3 số.
 * @param config Cấu hình đọc số.
 * @param b Chữ số hàng chục.
 * @param c Chữ số hàng đơn vị.
 * @param hasHundred Có đọc chữ số hàng trăm không.
 * @returns Array các từ đã đọc.
 */
function readTwoDigits(config: ReadingConfig, b: number, c: number): string[] {
	const output: string[] = []

	switch (b) {
		case 0: {
			output.push(config.digits[c])
			break
		}
		case 1: {
			output.push(config.tenText)
			if (c === 5)
				output.push(config.fiveToneText)
			else if (c !== 0)
				output.push(config.digits[c])
			break
		}
		default: {
			output.push(config.digits[b], config.tenToneText)
			if (c === 1)
				output.push(config.oneToneText)
			else if (c === 4 && b !== 4)
				output.push(config.fourToneText)
			else if (c === 5)
				output.push(config.fiveToneText)
			else if (c !== 0)
				output.push(config.digits[c])
			break
		}
	}

	return output
}

/**
 * Đọc nhóm 3 chữ số.
 * @param config Cấu hình đọc số.
 * @param a Chữ số hàng trăm.
 * @param b Chữ số hàng chục.
 * @param c Chữ số hàng đơn vị.
 * @param readZeroHundred Có luôn đọc "không trăm" không.
 * @returns Array các từ đã đọc.
 */
function readThreeDigits(config: ReadingConfig,
		a: number, b: number, c: number, readZeroHundred: boolean): string[] {
	const output: string[] = []
	const hasHundred = a !== 0 || readZeroHundred

	// Đọc hàng trăm
	if (hasHundred)
		output.push(config.digits[a], config.hundredText)

	// Đọc phần lẻ trăm
	if (hasHundred && b === 0) {
		if (c === 0)
			return output
		output.push(config.oddText)
	}

	// Đọc phần đơn vị
	output.push(...readTwoDigits(config, b, c))

	return output
}

/**
 * Loại bỏ các số 0 thừa ở đầu và cuối chuỗi số.
 * @param config Cấu hình đọc số.
 * @param number Chuỗi số đầu vào.
 * @returns Chuỗi số đã loại bỏ các số 0 thừa.
 */
function trimRedundantZeros(config: ReadingConfig, number: string): string {
	number = trimLeft(number, config.filledDigit)
	if (number.includes(config.pointSign))
		number = trimRight(number, config.filledDigit)
	return number
}

/**
 * Thêm các chữ số 0 vào đầu chuỗi số.
 * Sao cho độ dài phần nguyên luôn chia hết cho 3.
 * @param config Cấu hình đọc số.
 * @param number Chuỗi số đầu vào.
 * @returns Chuỗi số đã thêm các số 0 ở đầu.
 */
function addLeadingZerosToFitGroup(config: ReadingConfig, number: string): string {
	const pointPos = number.indexOf(config.pointSign)
	const integralLength = pointPos === -1 ? number.length : pointPos
	const newIntegralLength = Math.ceil(integralLength / config.periodSize) * config.periodSize
	return number.padStart(number.length + newIntegralLength - integralLength, config.filledDigit)
}

/**
 * Gom dãy các chữ số thành từng nhóm 3 chữ số.
 * @param config Cấu hình đọc số.
 * @param digits Array các chữ số.
 * @returns Array các nhóm 3 chữ số
 */
function zipIntegralDigits(config: ReadingConfig, digits: number[]): Period[] {
	const output: Period[] = []
	const periodCount = Math.ceil(digits.length / config.periodSize)
	for (let i = 0; i < periodCount; i++) {
		const [a, b, c] = digits.slice(i * config.periodSize)
		output.push([a, b, c])
	}
	return output
}

/**
 * Phân tích chuỗi số thành dạng `NumberData`.
 * @param config Cấu hình đọc số.
 * @param number Số cần đọc.
 * @returns Dữ liệu số đã phân tích, `null` nếu số không hợp lệ.
 */
function parseNumberData(config: ReadingConfig, number: string): NumberData | null {
	// Lưu lại & xóa dấu âm
	const isNegative = number[0] === config.negativeSign
	number = isNegative ? number.substring(1) : number

	// Chuẩn hóa chuỗi số
	number = trimRedundantZeros(config, number)
	number = addLeadingZerosToFitGroup(config, number)

	// Cắt chuỗi
	const pointPos = number.indexOf(config.pointSign)
	const integralString = pointPos === -1 ? number : number.substring(0, pointPos)
	const fractionalString = pointPos === -1 ? '' : number.substring(pointPos + 1)

	// Phân tích từng chữ số
	const integralDigits = integralString.split('').map(digit => parseInt(digit))
	const fractionalDigits = fractionalString.split('').map(digit => parseInt(digit))

	// Check quá trình parse có lỗi không
	if (integralDigits.includes(NaN) || fractionalDigits.includes(NaN))
		return null

	// Gom nhóm chữ số & chuẩn hóa
	const integralPart = zipIntegralDigits(config, integralDigits)
	const fractionalPart = fractionalDigits

	// Nếu phần nguyên rỗng thì thêm 0
	if (integralPart.length === 0)
		integralPart.push([0, 0, 0])

	return { isNegative, integralPart, fractionalPart }
}

/**
 * Đọc các chữ số phần nguyên.
 * @param config Cấu hình đọc số.
 * @param digits Array các chữ số (không dư thừa, độ dài phải chia hết cho 3).
 * @returns Array các từ đã đọc.
 */
function readIntegralPart(config: ReadingConfig, integralPart: Period[]): string[] {
	const output: string[] = []

	// Đọc từng nhóm 3 chữ số
	const isSinglePeriod = integralPart.length === 1
	for (let i = 0; i < integralPart.length; i++) {
		const isFirstPeriod = i === 0
		const period = integralPart[i]
		const [a, b, c] = period
		if (a !== 0 || b !== 0 || c !== 0 || isSinglePeriod)
			output.push(
				...readThreeDigits(config, a, b, c, !isFirstPeriod),
				...config.units[integralPart.length - 1 - i])
	}

	return output
}

/**
 * Đọc các chữ số phần thập phân.
 * @param config Cấu hình đọc số.
 * @param digits Array các chữ số (không dư thừa).
 * @returns Array các từ đã đọc.
 */
function readFractionalPart(config: ReadingConfig, digits: number[]): string[] {
	const output: string[] = []

	// Cách đọc dựa theo độ dài phần thập phân
	switch (digits.length) {
		case 2: {
			// Đọc nhóm 2 chữ số
			const [b, c] = digits
			output.push(...readTwoDigits(config, b, c))
			break
		}
		case 3: {
			// Đọc nhóm 3 chữ số
			const [a, b, c] = digits
			output.push(...readThreeDigits(config, a, b, c, true))
			break
		}
		default: {
			// Đọc từng chữ số riêng rẽ
			for (const digit of digits)
				output.push(config.digits[digit])
			break
		}
	}

	return output
}

/**
 * Đọc số đã phân tích thành dạng `NumberData`.
 * @return String mô tả cách đọc số.
 * @param config Cấu hình đọc số.
 * @param numberData Số cần đọc.
 */
function readNumber(config: ReadingConfig, numberData: NumberData): string {
	const output: string[] = []

	// Đọc các chữ số
	output.push(...readIntegralPart(config, numberData.integralPart))
	if (numberData.fractionalPart.length !== 0)
		output.push(config.pointText, ...readFractionalPart(config, numberData.fractionalPart))

	// Thêm dấu & đơn vị
	if (numberData.isNegative)
		output.unshift(config.negativeText)
	output.push(...config.unit)

	return output.join(config.separator)
}

export {
	readTwoDigits, readThreeDigits,
	trimRedundantZeros, addLeadingZerosToFitGroup, zipIntegralDigits,
	parseNumberData, readIntegralPart, readFractionalPart, readNumber
}

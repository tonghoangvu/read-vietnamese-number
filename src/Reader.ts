import { NumberData } from './NumberData'
import { ReadingConfig } from './ReadingConfig'
import { trimLeft, trimRight } from './Utils'

/**
 * Đọc hai chữ số cuối trong nhóm 3 số.
 * @param config Cấu hình đọc số.
 * @param b Chữ số hàng chục.
 * @param c Chữ số hàng đơn vị.
 * @param hasHundred Có đọc chữ số hàng trăm không.
 * @returns Array các từ đã đọc.
 */
function readTwoDigits(config: ReadingConfig, b: number, c: number, hasHundred: boolean): string[] {
    const output: string[] = []

    switch (b) {
        case 0: {
            if (hasHundred && c === 0)
                break
            if (hasHundred)
                output.push(config.oddText)
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

    // Đọc hàng trăm
    if (a !== 0 || readZeroHundred)
        output.push(config.digits[a], config.hundredText)

    // Đọc hàng chục & đơn vị
    output.push(...readTwoDigits(config, b, c, a !== 0 || readZeroHundred))

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

    // Loại bỏ các số 0 thừa (đầu phần nguyên & sau phần thập phân)
    number = trimLeft(number, config.filledDigit)
    let pointPos = number.indexOf(config.pointSign)
    if (pointPos !== -1)
        number = trimRight(number, config.filledDigit)

    // Thêm các số 0 ở đầu, cho độ phần nguyên chia hết cho 3 (đọc theo từng nhóm)
    pointPos = number.indexOf(config.pointSign)
    const integerLength = pointPos === -1 ? number.length : pointPos
    const newIntegerLength = Math.ceil(integerLength / config.digitsPerPart) * config.digitsPerPart
    number = number.padStart(number.length + newIntegerLength - integerLength, config.filledDigit)

    // Phân tích từng chữ số
    const digits: number[] = []
    const digitsAfterPoint: number[] = []
    pointPos = number.indexOf(config.pointSign)
    for (let i = 0; i < number.length; i++) {
        if (i === pointPos)
            continue

        // Check chữ số hợp lệ
        const digit = parseInt(number[i])
        if (isNaN(digit))
            return null

        // Thêm chữ số vào phần tương ứng
        if (pointPos === -1 || i < pointPos)
            digits.push(digit)
        else
            digitsAfterPoint.push(digit)
    }

    // Nếu phần nguyên rỗng thì thêm 0
    if (digits.length === 0)
        digits.push(0, 0, 0)

    const result: NumberData = { isNegative, digits, digitsAfterPoint }
    return result
}

/**
 * Đọc các chữ số phần nguyên.
 * @param config Cấu hình đọc số.
 * @param digits Array các chữ số (không dư thừa, độ dài phải chia hết cho 3).
 * @returns Array các từ đã đọc.
 */
function readBeforePoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = []

    // Đọc từng nhóm 3 chữ số
    const partCount = Math.ceil(digits.length / config.digitsPerPart)
    for (let i = 0; i < partCount; i++) {
        // Lấy ra nhóm 3 chữ số
        const [a, b, c] = digits.slice(i * config.digitsPerPart)
        const isFirstPart = i === 0
        const isSinglePart = partCount === 1

        // Đọc số & đơn vị của nhóm
        if (a !== 0 || b !== 0 || c !== 0 || isSinglePart)
            output.push(
                ...readThreeDigits(config, a, b, c, !isFirstPart),
                ...config.units[partCount - 1 - i])
    }

    return output
}

/**
 * Đọc các chữ số phần thập phân.
 * @param config Cấu hình đọc số.
 * @param digits Array các chữ số (không dư thừa).
 * @returns Array các từ đã đọc.
 */
function readAfterPoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = []

    // Cách đọc dựa theo độ dài phần thập phân
    switch (digits.length) {
        case 0:
            break
        case 2: {
            // Đọc nhóm 2 chữ số
            const [b, c] = digits
            output.push(...readTwoDigits(config, b, c, true))
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
    output.push(...readBeforePoint(config, numberData.digits))
    if (numberData.digitsAfterPoint.length !== 0)
        output.push(config.pointText, ...readAfterPoint(config, numberData.digitsAfterPoint))

    // Thêm dấu & đơn vị
    if (numberData.isNegative)
        output.unshift(config.negativeText)
    output.push(...config.unit)

    return output.join(config.separator)
}

export {
    readTwoDigits, readThreeDigits, readBeforePoint, readAfterPoint,
    parseNumberData, readNumber
}

import NumberData from './NumberData';
import ReadingConfig from './ReadingConfig';
import Utils from './Utils';

/**
 * Đọc hai chữ số cuối trong nhóm ba số.
 * Trả về mảng các từ riêng rẽ.
 * @param config Object cấu hình
 * @param b Chữ số hàng chục
 * @param c Chữ số hàng đơn vị
 * @param hasHundred Có đọc chữ số hàng trăm không
 */
function readTwoDigits(config: ReadingConfig,
        b: number, c: number, hasHundred: boolean): string[] {
    const output: string[] = [];

    // Đọc hai chữ số cuối & xử lý các trường hợp ngoại lệ
    switch (b) {
        case 0: {
            if (hasHundred && c === 0)
                break;
            if (hasHundred)
                output.push(config.oddText);
            output.push(config.digits[c]);
            break;
        }
        case 1: {
            output.push(config.tenText);
            if (c === 5)
                output.push(config.fiveToneText);
            else if (c !== 0)
                output.push(config.digits[c]);
            break;
        }
        default: {
            output.push(config.digits[b], config.tenToneText);
            if (c === 1)
                output.push(config.oneToneText);
            else if (c === 4 && b !== 4)
                output.push(config.fourToneText);
            else if (c === 5)
                output.push(config.fiveToneText);
            else if (c !== 0)
                output.push(config.digits[c]);
            break;
        }
    }

    return output;
}

/**
 * Đọc nhóm gồm ba chữ số.
 * Trả về mảng các từ riêng rẽ.
 * @param config Object cấu hình
 * @param a Chữ số hàng trăm
 * @param b Chữ số hàng chục
 * @param c Chữ số hàng đơn vị
 * @param readZeroHundred Có luôn đọc không trăm hay không
 */
function readThreeDigits(config: ReadingConfig,
        a: number, b: number, c: number, readZeroHundred: boolean): string[] {
    const output: string[] = [];

    // Đọc chữ số hàng trăm
    if (a !== 0 || readZeroHundred)
        output.push(config.digits[a], config.hundredText);

    // Đọc thêm hai số hàng chục & hàng đơn vị
    output.push(...readTwoDigits(config, b, c, a !== 0 || readZeroHundred));

    return output;
}

/**
 * Phân tích chuỗi số thành dạng `NumberData` có thể đọc được.
 * Trả về `null` nếu phân tích lỗi, số không hợp lệ.
 * @param config Object cấu hình
 * @param number Số cần đọc
 */
function parseNumberData(config: ReadingConfig, number: string): NumberData | null {
    // Ghi nhận & loại bỏ dấu âm
    const isNegative = number[0] === config.negativeSign;
    number = isNegative ? number.substring(1) : number;

    // Loại bỏ các số 0 ở đầu phần nguyên & cuối phần thập phân (nếu có)
    number = Utils.trimLeadingChars(number, config.filledDigit);
    let pointPos = number.indexOf(config.pointSign);
    if (pointPos !== -1)
        number = Utils.trimTrailingChars(number, config.filledDigit);

    // Tính & thêm các số 0 ở đầu cho độ dài phần nguyên chia hết cho 3 (để đọc theo từng nhóm)
    pointPos = number.indexOf(config.pointSign);  // Tính lại
    const integerLength = pointPos === -1 ? number.length : pointPos;
    const needLeadingZeros = Utils.countNeedToFitLength(integerLength, config.digitsPerPart);
    number = Utils.addLeadingCharsToFitLength(number, config.filledDigit, needLeadingZeros);

    // Phân tích lần lượt từng chữ số thành data
    const digits: number[] = [];
    const digitsAfterPoint: number[] = [];
    pointPos = number.indexOf(config.pointSign);  // Tính lại
    for (let i = 0; i < number.length; i++) {
        // Bỏ qua dấu chấm thập phân
        if (i === pointPos)
            continue;

        // Thử parse chữ số, return null nếu không phải chữ số hợp lệ
        const digit = parseInt(number[i]);
        if (isNaN(digit))
            return null;

        // Thêm chữ số vào mảng data phần nguyên hoặc phần thập phân
        if (pointPos === -1 || i < pointPos)
            digits.push(digit);
        else
            digitsAfterPoint.push(digit);
    }

    // Nếu phần nguyên rỗng thì thêm 0
    if (digits.length === 0)
        digits.push(0, 0, 0);

    // Trả về data hoàn chỉnh
    const result: NumberData = { isNegative, digits, digitsAfterPoint };
    return result;
}

/**
 * Đọc các chữ số phần nguyên (trước dấu chấm thập phân).
 * Trả về mảng các từ riêng rẽ.
 * @param config Object cấu hình
 * @param digits Mảng các chữ số (phần nguyên), đã loại bỏ dư thừa, độ dài luôn chia hết cho 3
 */
function readBeforePoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = [];

    // Đọc theo từng nhóm
    const partCount = Math.ceil(digits.length / config.digitsPerPart);
    for (let i = 0; i < partCount; i++) {
        // Lấy 3 chữ số của nhóm
        const [a, b, c] = digits.slice(i * config.digitsPerPart);
        const isFirstPart = i === 0;
        const isSinglePart = partCount === 1;

        // Nếu nhóm không rỗng thì đọc số & phần đơn vị
        if (a !== 0 || b !== 0 || c !== 0 || isSinglePart)
            output.push(
                ...readThreeDigits(config, a, b, c, !isFirstPart),
                ...config.units[partCount - 1 - i]);
    }

    return output;
}

/**
 * Đọc các chữ số phần thập phân (sau dấu chấm thập phân).
 * Trả về mảng các từ riêng rẽ.
 * @param config Object cấu hình
 * @param digits Mảng các chữ số (phần thập phân), đã loại bỏ dư thừa
 */
function readAfterPoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = [];

    // Dựa vào độ dài phần thập phân mà đọc cho phù hợp
    switch (digits.length) {
        case 0:
            // Không đọc
            break;
        case 2: {
            // Đọc nhóm 2 chữ số
            const [b, c] = digits;
            output.push(...readTwoDigits(config, b, c, true));
            break;
        }
        case 3: {
            // Đọc nhóm 3 chữ số
            const [a, b, c] = digits;
            output.push(...readThreeDigits(config, a, b, c, true));
            break;
        }
        default: {
            // Đọc lần lượt từng chữ số riêng rẽ
            for (const digit of digits)
                output.push(config.digits[digit]);
            break;
        }
    }

    return output;
}

/**
 * Đọc bất kì chuỗi số nào đã được phân tích thành `NumberData`.
 * Trả về chuỗi đọc số hoàn chỉnh, gồm cả dấu âm & dấu thập phân.
 * @param config Object cấu hình
 * @param numberData Số đã phân tích thành `NumberData`
 */
function readNumber(config: ReadingConfig, numberData: NumberData): string {
    const output: string[] = [];

    // Đọc các chữ số phần nguyên & phần thập phân
    output.push(...readBeforePoint(config, numberData.digits));
    if (numberData.digitsAfterPoint.length !== 0)
        output.push(config.pointText, ...readAfterPoint(config, numberData.digitsAfterPoint));

    // Thêm dấu & đơn vị tính
    if (numberData.isNegative)
        output.unshift(config.negativeText);
    output.push(...config.unit);

    // Nối các từ lại thành chuỗi hoàn chỉnh
    return output.join(config.separator);
}

export default {
    readTwoDigits, readThreeDigits, parseNumberData, readBeforePoint, readAfterPoint, readNumber
};

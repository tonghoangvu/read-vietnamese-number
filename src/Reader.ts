import NumberData from './NumberData';
import ReadingConfig from './ReadingConfig';
import Utils from './Utils';

function readTwoDigits(config: ReadingConfig,
        b: number, c: number, hasHundred: boolean): string[] {
    const output: string[] = [];

    if (b === 0) {
        if (!hasHundred || c !== 0) {
            if (hasHundred)
                output.push(config.oddText);
            output.push(config.digits[c]);
        }
    } else if (b === 1) {
        output.push(config.tenText);
        if (c === 5)
            output.push(config.fiveToneText);
        else if (c !== 0)
            output.push(config.digits[c]);
    } else {
        output.push(config.digits[b], config.tenToneText);
        if (c === 1)
            output.push(config.oneToneText);
        else if (c === 4 && b !== 4)
            output.push(config.fourToneText);
        else if (c === 5)
            output.push(config.fiveToneText);
        else if (c !== 0)
            output.push(config.digits[c]);
    }

    return output;
}

function readThreeDigits(config: ReadingConfig,
        a: number, b: number, c: number, readZeroHundred: boolean): string[] {
    const output: string[] = [];

    // Read hundred even zero, apply for all parts, except the first part (on the left)
    if (a !== 0 || readZeroHundred)
        output.push(config.digits[a], config.hundredText);
    output.push(...readTwoDigits(config, b, c, a !== 0 || readZeroHundred));

    return output;
}

function parseNumberData(config: ReadingConfig, number: string): NumberData | null {
    // Check & remove negative sign
    const isNegative: boolean = number[0] === config.negativeSign;
    number = isNegative ? number.substring(1) : number;

    // Trim leading & trailing zeros (if exist)
    number = Utils.trimLeadingChars(number, config.filledDigit);
    let pointPos: number = number.indexOf(config.pointSign);
    if (pointPos !== -1)
        number = Utils.trimTrailingChars(number, config.filledDigit);

    // Fit number length in 3 digits group
    pointPos = number.indexOf(config.pointSign);  // Recalc
    const integerLength = pointPos === -1 ? number.length : pointPos;
    const needLeadingZeros = Utils.countNeedToFitLength(integerLength, config.digitsPerPart);
    number = Utils.addLeadingCharsToFitLength(number, config.filledDigit, needLeadingZeros);

    // Parse digits (strict)
    const digits: number[] = [];
    const digitsAfterPoint: number[] = [];

    pointPos = number.indexOf(config.pointSign);  // Recalc
    for (let i = 0; i < number.length; i++) {
        // Skip point sign
        if (i === pointPos)
            continue;

        // Get digit
        const digit: number = parseInt(number[i]);
        if (isNaN(digit))
            return null;  // Parsing error

        // Push to before or after point array
        if (pointPos === -1 || i < pointPos)
            digits.push(digit);
        else
            digitsAfterPoint.push(digit);
    }

    // Building result
    const result: NumberData = { isNegative, digits, digitsAfterPoint };
    return result;
}

function readBeforePoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = [];

    const partCount: number = Math.round(digits.length / config.digitsPerPart);
    for (let i = 0; i < partCount; i++) {
        const [a, b, c] = digits.slice(i * config.digitsPerPart);
        const isFirstPart: boolean = i === 0;
        const isSinglePart: boolean = partCount === 1;
        if (a !== 0 || b !== 0 || c !== 0 || isSinglePart)
            output.push(
                ...readThreeDigits(config, a, b, c, !isFirstPart),
                ...config.units[partCount - 1 - i]);
    }

    return output;
}

function readAfterPoint(config: ReadingConfig, digits: number[]): string[] {
    const output: string[] = [];

    switch (digits.length) {
        case 0:
            break;
        case 1: case 2: {
            // Read in group 2 digits
            const [b, c] = digits;
            output.push(...readTwoDigits(config, b, c, true));
            break;
        }
        case 3: {
            // Read in group 3 digits
            const [a, b, c] = digits;
            output.push(...readThreeDigits(config, a, b, c, true));
            break;
        }
        default: {
            // Read each digits sequential
            for (const digit of digits)
                output.push(config.digits[digit]);
            break;
        }
    }

    return output;
}

function readNumber(config: ReadingConfig, numberData: NumberData): string {
    const output: string[] = [];

    // Read digits before & after point
    output.push(...readBeforePoint(config, numberData.digits));
    if (numberData.digitsAfterPoint.length !== 0)
        output.push(config.pointText, ...readAfterPoint(config, numberData.digitsAfterPoint));

    // Add sign and units
    if (numberData.isNegative)
        output.unshift(config.negativeText);
    output.push(...config.unit);

    // Return joined result
    return output.join(config.separator);
}

export default {
    readTwoDigits, readThreeDigits, parseNumberData, readBeforePoint, readAfterPoint, readNumber
};

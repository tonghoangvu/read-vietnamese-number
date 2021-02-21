import NumberData from './NumberData';
import ReadingConfig from './ReadingConfig';

function readTwoDigits(config: ReadingConfig,
        b: number, c: number, hasHundred: boolean): string[] {
    const output: string[] = [];

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

function readThreeDigits(config: ReadingConfig,
        a: number, b: number, c: number, readZeroHundred: boolean): string[] {
    const output: string[] = [];

    // Read hundred even zero, apply for all parts, except the first part (on the left)
    if (a !== 0 || readZeroHundred)
        output.push(config.digits[a], config.hundredText);

    output.push(...readTwoDigits(config, b, c, a !== 0 || readZeroHundred));

    return output;
}

function parseNumberData(config: ReadingConfig, number: string): NumberData {
    // Remove negative sign
    const isNegative: boolean = number[0] === config.negativeSign;
    let rawStr: string = (isNegative) ? number.substring(1) : number;
    let pointPos: number = rawStr.indexOf(config.pointSign);

    // Remove leading 0s
    let pos = 0;
    while (rawStr[pos] === config.filledDigit)
        pos++;
    rawStr = rawStr.substring(pos);

    // Remove trailing 0s (if has point)
    if (pointPos !== -1) {
        let lastPos: number = rawStr.length - 1;
        while (rawStr[lastPos] === config.filledDigit)
            lastPos--;
        rawStr = rawStr.substring(0, lastPos + 1);
    }

    // Count 0s to add
    pointPos = rawStr.indexOf(config.pointSign);
    const beforePointLength: number = (pointPos === -1)
        ? rawStr.length : pointPos;
    let needZeroCount = 0;
    const modZeroCount: number = beforePointLength % config.digitsPerPart;
    if (modZeroCount !== 0)
        needZeroCount = config.digitsPerPart - modZeroCount;

    // Add leading 0s to fit parts
    let fullStr = '';
    for (let i = 0; i < needZeroCount; i++)
        fullStr += config.filledDigit;
    fullStr += rawStr;

    // Parse digits
    const digits: number[] = [];
    const digitsAfterPoint: number[] = [];

    pointPos = fullStr.indexOf(config.pointSign);
    for (let i = 0; i < fullStr.length; i++)
        if (i !== pointPos) {
            const digit: number = parseInt(fullStr[i]);
            if (isNaN(digit))
                throw new Error('Số không hợp lệ');
            if (pointPos === -1 || i < pointPos)
                digits.push(digit);
            else
                digitsAfterPoint.push(digit);
        }

    // Building result
    const result: NumberData = { isNegative, digits, digitsAfterPoint };
    return result;
}

function readNumber(config: ReadingConfig, numberData: NumberData): string {
    const output: string[] = [];
    const partCount: number = Math.round(numberData.digits.length / config.digitsPerPart);

    // Read before point digits
    for (let i = 0; i < partCount; i++) {
        const a: number = numberData.digits[i * config.digitsPerPart];
        const b: number = numberData.digits[i * config.digitsPerPart + 1];
        const c: number = numberData.digits[i * config.digitsPerPart + 2];

        const isFirstPart: boolean = i === 0;
        const isSinglePart: boolean = partCount === 1;
        if (a !== 0 || b !== 0 || c !== 0 || isSinglePart)
            output.push(
                ...readThreeDigits(config, a, b, c, !isFirstPart),
                ...config.units[partCount - i - 1]);
    }

    // Read after point digits
    if (numberData.digitsAfterPoint.length !== 0)
        output.push(config.pointText);
    switch (numberData.digitsAfterPoint.length) {
        case 0:
            // Don't read
            break;
        case 1: case 2: {
            // Read in group 2 digits
            const b: number = numberData.digitsAfterPoint[0];
            const c: number = numberData.digitsAfterPoint[1];
            output.push(...readTwoDigits(config, b, c, true));
            break;
        }
        case 3: {
            // Read in group 3 digits
            const a: number = numberData.digitsAfterPoint[0];
            const b: number = numberData.digitsAfterPoint[1];
            const c: number = numberData.digitsAfterPoint[2];
            output.push(...readThreeDigits(config, a, b, c, true));
            break;
        }
        default: {
            // Read each digits sequential
            for (let i = 0; i < numberData.digitsAfterPoint.length; i++)
                output.push(config.digits[numberData.digitsAfterPoint[i]]);
        }
    }

    // Add sign and units
    if (numberData.isNegative)
        output.unshift(config.negativeText);
    output.push(...config.unit);

    // Return joined result
    return output.join(config.separator);
}

export default {
    readTwoDigits, readThreeDigits, parseNumberData, readNumber
};

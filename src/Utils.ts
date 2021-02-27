function trimLeadingChars(str: string, char: string): string {
    let pos = 0;
    while (str[pos] === char[0])
        pos++;
    return str.substring(pos);
}

function trimTrailingChars(str: string, char: string): string {
    let lastPos = str.length - 1;
    while (str[lastPos] === char[0])
        lastPos--;
    return str.substring(0, lastPos + 1);
}

function countNeedToFitLength(length: number, groupSize: number): number {
    const mod = length % groupSize;
    return mod === 0 ? 0 : groupSize - mod;
}

function addLeadingCharsToFitLength(str: string, char: string, count: number): string {
    return char.repeat(count).concat(str);
}

export default {
    trimLeadingChars, trimTrailingChars, countNeedToFitLength, addLeadingCharsToFitLength
};

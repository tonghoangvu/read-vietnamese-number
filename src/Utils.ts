/**
 * Trả về chuỗi mới đã loại bỏ các kí tự `char` ở đầu chuỗi `str`.
 * @param str Chuỗi input
 * @param char Kí tự cần loại bỏ
 */
function trimLeadingChars(str: string, char: string): string {
    let pos = 0;
    while (str[pos] === char[0])
        pos++;
    return str.substring(pos);
}

/**
 * Trả về chuỗi mới đã loại bỏ các kí tự `char` ở cuối chuỗi `str`.
 * @param str Chuỗi input
 * @param char Kí tự cần loại bỏ
 */
function trimTrailingChars(str: string, char: string): string {
    let lastPos = str.length - 1;
    while (str[lastPos] === char[0])
        lastPos--;
    return str.substring(0, lastPos + 1);
}

/**
 * Trả về số lượng kí tự cần thêm vào để chia đều được cho các nhóm.
 * @param length Độ dài hiện tại
 * @param groupSize Độ dài mỗi nhóm
 */
function countNeedToFitLength(length: number, groupSize: number): number {
    const mod = length % groupSize;
    return mod === 0 ? 0 : groupSize - mod;
}

/**
 * Trả về chuỗi mới đã thêm `count` kí tự `char` ở đầu chuỗi `str`.
 * @param str Chuỗi input
 * @param char Kí tự cần thêm vào
 * @param count Số lượng kí tự cần thêm
 */
function addLeadingCharsToFitLength(str: string, char: string, count: number): string {
    return char.repeat(count).concat(str);
}

export default {
    trimLeadingChars, trimTrailingChars, countNeedToFitLength, addLeadingCharsToFitLength
};

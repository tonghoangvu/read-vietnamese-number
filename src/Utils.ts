/**
 * Loại bỏ kí tự `char` đầu chuỗi `str`.
 * @returns Chuỗi đã thực hiện loại bỏ.
 * @param str Chuỗi bất kì.
 * @param char Kí tự cần loại bỏ.
 */
function trimLeadingChars(str: string, char: string): string {
    let pos = 0
    while (str[pos] === char[0])
        pos++
    return str.substring(pos)
}

/**
 * Loại bỏ kí tự `char` ở cuối chuỗi `str`.
 * @returns Chuỗi đã thực hiện loại bỏ.
 * @param str Chuỗi bất kì.
 * @param char Kí tự cần loại bỏ.
 */
function trimTrailingChars(str: string, char: string): string {
    let lastPos = str.length - 1
    while (str[lastPos] === char[0])
        lastPos--
    return str.substring(0, lastPos + 1)
}

/**
 * Tính số lượng kí tự bổ sung để chia đều thành các nhóm.
 * @returns Số lượng kí tự cần thêm.
 * @param length Độ dài hiện tại.
 * @param groupSize Độ dài mỗi nhóm.
 */
function countNeedToFitLength(length: number, groupSize: number): number {
    const mod = groupSize === 0 ? 0 : length % groupSize
    return mod === 0 ? 0 : groupSize - mod
}

/**
 * Thêm `count` kí tự `char` ở đầu chuỗi `str`.
 * @returns Chuỗi đã thực hiện thêm kí tự.
 * @param str Chuỗi bất kì.
 * @param char Kí tự cần thêm.
 * @param count Số lượng kí tự cần thêm.
 */
function addLeadingCharsToFitLength(str: string, char: string, count: number): string {
    return char[0].repeat(count).concat(str)
}

export default {
    trimLeadingChars, trimTrailingChars, countNeedToFitLength, addLeadingCharsToFitLength
}

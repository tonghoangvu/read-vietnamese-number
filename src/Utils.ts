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

export default {
    trimLeadingChars, trimTrailingChars
}

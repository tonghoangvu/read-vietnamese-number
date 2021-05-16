/**
 * Loại bỏ các kí tự `char` bên trái chuỗi `str`.
 * @returns Chuỗi đã thực hiện loại bỏ.
 * @param str Chuỗi bất kì.
 * @param char Kí tự cần loại bỏ.
 */
function trimLeft(str: string, char: string): string {
    if (str === '')
        return ''
    let pos = 0
    while (str[pos] === char[0])
        pos++
    return str.substring(pos)
}

/**
 * Loại bỏ các kí tự `char` bên phải chuỗi `str`.
 * @returns Chuỗi đã thực hiện loại bỏ.
 * @param str Chuỗi bất kì.
 * @param char Kí tự cần loại bỏ.
 */
function trimRight(str: string, char: string): string {
    if (str === '')
        return ''
    let lastPos = str.length - 1
    while (str[lastPos] === char[0])
        lastPos--
    return str.substring(0, lastPos + 1)
}

export default {
    trimLeft, trimRight
}

import Utils from '../src/Utils'

describe('Trim leading chars function', () => {
    const func = Utils.trimLeadingChars

    it('Should return empty', () => {
        expect(func('', '')).toBe('')
        expect(func('', 'x')).toBe('')
        expect(func('', 'xy')).toBe('')
    })

    it('Should return itself', () => {
        expect(func('abc', '')).toBe('abc')
        expect(func('abc', 'x')).toBe('abc')
        expect(func('abc', 'xy')).toBe('abc')
    })

    it('Should trim all leading specified characters', () => {
        expect(func('abc', 'a')).toBe('bc')
        expect(func('abc', 'ab')).toBe('bc')
        expect(func('aaababc', 'a')).toBe('babc')
    })
})

describe('Trim trailing chars function', () => {
    const func = Utils.trimTrailingChars

    it('Should return empty', () => {
        expect(func('', '')).toBe('')
        expect(func('', 'x')).toBe('')
        expect(func('', 'xy')).toBe('')
    })

    it('Should return itself', () => {
        expect(func('abc', '')).toBe('abc')
        expect(func('abc', 'x')).toBe('abc')
        expect(func('abc', 'xy')).toBe('abc')
        expect(func('abc', 'bc')).toBe('abc')
    })

    it('Should trim all trailing specified characters', () => {
        expect(func('abc', 'c')).toBe('ab')
        expect(func('abc', 'cb')).toBe('ab')
        expect(func('abccccc', 'c')).toBe('ab')
    })
})

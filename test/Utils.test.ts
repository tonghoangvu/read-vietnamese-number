import Utils from '../src/Utils'

describe('Test Utils functions', () => {
    test('Trim leading chars', () => {
        // Setup
        const func = Utils.trimLeadingChars

        // Assert
        expect(func('abc', 'x')).toBe('abc')
        expect(func('abc', 'a')).toBe('bc')
        expect(func('aaaabaac', 'a')).toBe('baac')
        expect(func('aaaabaac', 'ab')).toBe('baac')
        expect(func('aabc', '')).toBe('aabc')
    })

    test('Trim trailing chars', () => {
        // Setup
        const func = Utils.trimTrailingChars

        // Assert
        expect(func('abc', 'x')).toBe('abc')
        expect(func('abc', 'c')).toBe('ab')
        expect(func('aabcccc', 'c')).toBe('aab')
        expect(func('aabcccc', 'cb')).toBe('aab')
        expect(func('abcc', '')).toBe('abcc')
    })
})

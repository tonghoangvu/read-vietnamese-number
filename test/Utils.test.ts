import Utils from '../src/Utils';

describe('Test Utils functions', () => {
    test('Trim leading chars', () => {
        // Setup
        const func = Utils.trimLeadingChars;

        // Assert
        expect(func('abc', 'x')).toBe('abc');
        expect(func('abc', 'a')).toBe('bc');
        expect(func('aaaabaac', 'a')).toBe('baac');
        expect(func('aaaabaac', 'ab')).toBe('baac');
        expect(func('aabc', '')).toBe('aabc');
    });

    test('Trim trailing chars', () => {
        // Setup
        const func = Utils.trimTrailingChars;

        // Assert
        expect(func('abc', 'x')).toBe('abc');
        expect(func('abc', 'c')).toBe('ab');
        expect(func('aabcccc', 'c')).toBe('aab');
        expect(func('aabcccc', 'cb')).toBe('aab');
        expect(func('abcc', '')).toBe('abcc');
    });

    test('Count need to fit length', () => {
        // Setup
        const func = Utils.countNeedToFitLength;

        // Assertion
        expect(func(0, 3)).toBe(0);
        expect(func(1, 3)).toBe(2);
        expect(func(2, 3)).toBe(1);
        expect(func(5, 3)).toBe(1);
        expect(func(6, 3)).toBe(0);
        expect(func(10, 0)).toBe(0);
    });

    test('Add leading chars to fit length', () => {
        // Setup
        const func = Utils.addLeadingCharsToFitLength;

        // Assert
        expect(func('', 'ab', 3)).toBe('aaa');
        expect(func('abc', 'x', 2)).toBe('xxabc');
        expect(func('abc', 'x', 0)).toBe('abc');
    });
});

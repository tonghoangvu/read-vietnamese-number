import Utils from '../src/Utils';

describe('Test Utils functions', () => {
    test('Remove leading chars', () => {
        // Setup
        interface TestCase {
            str: string;
            char: string;
            expected: string;
        }

        // Prepare cases
        const CASES: TestCase[] = [
            { str: 'abc', char: 'x', expected: 'abc' },
            { str: 'abc', char: 'a', expected: 'bc' },
            { str: 'abc', char: 'ab', expected: 'bc' },
            { str: 'aaaabaac', char: 'a', expected: 'baac' },
            { str: 'aaaabaac', char: 'ab', expected: 'baac' },
            { str: 'aaabc', char: 'ab', expected: 'bc' },
            { str: 'aabc', char: '', expected: 'aabc' }
        ];

        // Assert
        for (const test of CASES)
            expect(
                Utils.trimLeadingChars(test.str, test.char)
            ).toBe(test.expected);
    }, 1000);
});

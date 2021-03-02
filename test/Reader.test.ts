import NumberData from '../src/NumberData';
import ReadingConfig from '../src/ReadingConfig';
import Reader from '../src/Reader';

describe('Test Reader functions', () => {
    const config = new ReadingConfig();

    test('Read two digits', () => {
        // Setup
        const func = Reader.readTwoDigits;

        // Assert
        expect(func(config, 0, 0, false)).toStrictEqual(['không']);
        expect(func(config, 0, 0, true)).toStrictEqual([]);
        expect(func(config, 0, 3, false)).toStrictEqual(['ba']);
        expect(func(config, 0, 5, true)).toStrictEqual(['lẻ', 'năm']);
        expect(func(config, 1, 0, false)).toStrictEqual(['mười']);
        expect(func(config, 1, 0, true)).toStrictEqual(['mười']);
        expect(func(config, 1, 4, false)).toStrictEqual(['mười', 'bốn']);
        expect(func(config, 1, 4, true)).toStrictEqual(['mười', 'bốn']);
        expect(func(config, 3, 0, false)).toStrictEqual(['ba', 'mươi']);
        expect(func(config, 3, 0, true)).toStrictEqual(['ba', 'mươi']);
        expect(func(config, 3, 5, false)).toStrictEqual(['ba', 'mươi', 'lăm']);
        expect(func(config, 3, 5, true)).toStrictEqual(['ba', 'mươi', 'lăm']);
        expect(func(config, 4, 4, false)).toStrictEqual(['bốn', 'mươi', 'bốn']);
        expect(func(config, 4, 4, true)).toStrictEqual(['bốn', 'mươi', 'bốn']);
        expect(func(config, 9, 4, false)).toStrictEqual(['chín', 'mươi', 'tư']);
        expect(func(config, 9, 4, true)).toStrictEqual(['chín', 'mươi', 'tư']);
        expect(func(config, 9, 8, false)).toStrictEqual(['chín', 'mươi', 'tám']);
        expect(func(config, 9, 8, true)).toStrictEqual(['chín', 'mươi', 'tám']);
    }, 1000);

    test('Read three digits', () => {
        // Setup
        const func = Reader.readThreeDigits;

        // Assert
    }, 1000);

    test('Parse string number', () => {
        // Setup
        const func = Reader.parseNumberData;

        // Assert
        expect(func(config, '-1.23xy')).toBeNull();
        expect(func(config, '-12..3')).toBeNull();
        expect(func(config, '--12.34')).toBeNull();

        expect(func(config, '')).toStrictEqual({
            isNegative: false,
            digits: [],
            digitsAfterPoint: []
        } as NumberData);
        expect(func(config, '123')).toStrictEqual({
            isNegative: false,
            digits: [1, 2, 3],
            digitsAfterPoint: []
        } as NumberData);
        expect(func(config, '-12.3')).toStrictEqual({
            isNegative: true,
            digits: [0, 1, 2],
            digitsAfterPoint: [3]
        } as NumberData);
        expect(func(config, '0031.141590000')).toStrictEqual({
            isNegative: false,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData);
        expect(func(config, '-0031.141590000')).toStrictEqual({
            isNegative: true,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData);
    }, 1000);

    test('Read before point', () => {
        // Setup
        const func = Reader.readBeforePoint;

        // Assert
    }, 1000);

    test('Read after point', () => {
        // Setup
        const func = Reader.readAfterPoint;

        // Assert
    }, 1000);

    test('Read number generally', () => {
        // Setup
        const func = Reader.readNumber;

        // Assert
    }, 1000);
});

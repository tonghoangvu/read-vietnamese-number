import NumberData from '../src/NumberData';
import ReadingConfig from '../src/ReadingConfig';
import Reader from '../src/Reader';

describe('Test Reader functions', () => {
    // Global setup
    const config = new ReadingConfig();
    config.unit = [];

    test('Read two digits', () => {
        // Setup
        const func = Reader.readTwoDigits;

        // Assert
        expect(func(config, 0, 0, false)).toStrictEqual(['không']);
        expect(func(config, 0, 0, true)).toStrictEqual([]);
        expect(func(config, 0, 3, false)).toStrictEqual(['ba']);
        expect(func(config, 0, 3, true)).toStrictEqual(['lẻ', 'ba']);
        expect(func(config, 1, 0, false)).toStrictEqual(['mười']);
        expect(func(config, 1, 0, true)).toStrictEqual(['mười']);
        expect(func(config, 1, 4, false)).toStrictEqual(['mười', 'bốn']);
        expect(func(config, 1, 4, true)).toStrictEqual(['mười', 'bốn']);
        expect(func(config, 3, 0, false)).toStrictEqual(['ba', 'mươi']);
        expect(func(config, 3, 0, true)).toStrictEqual(['ba', 'mươi']);
        expect(func(config, 3, 5, false)).toStrictEqual(['ba', 'mươi', 'lăm']);
        expect(func(config, 3, 5, true)).toStrictEqual(['ba', 'mươi', 'lăm']);
        expect(func(config, 4, 1, false)).toStrictEqual(['bốn', 'mươi', 'mốt']);
        expect(func(config, 4, 1, true)).toStrictEqual(['bốn', 'mươi', 'mốt']);
        expect(func(config, 9, 4, false)).toStrictEqual(['chín', 'mươi', 'tư']);
        expect(func(config, 9, 4, true)).toStrictEqual(['chín', 'mươi', 'tư']);
        expect(func(config, 9, 8, false)).toStrictEqual(['chín', 'mươi', 'tám']);
        expect(func(config, 9, 8, true)).toStrictEqual(['chín', 'mươi', 'tám']);
    });

    test('Read three digits', () => {
        // Setup
        const func = Reader.readThreeDigits;

        // Assert
        expect(func(config, 0, 0, 0, false)).toStrictEqual(['không']);
        expect(func(config, 0, 0, 0, true)).toStrictEqual(['không', 'trăm']);
        expect(func(config, 0, 0, 1, false)).toStrictEqual(['một']);
        expect(func(config, 0, 0, 1, true)).toStrictEqual(['không', 'trăm', 'lẻ', 'một']);
        expect(func(config, 0, 2, 3, false)).toStrictEqual(['hai', 'mươi', 'ba']);
        expect(func(config, 0, 2, 3, true)).toStrictEqual(['không', 'trăm', 'hai', 'mươi', 'ba']);
        expect(func(config, 1, 0, 4, false)).toStrictEqual(['một', 'trăm', 'lẻ', 'bốn']);
        expect(func(config, 1, 0, 4, true)).toStrictEqual(['một', 'trăm', 'lẻ', 'bốn']);
        expect(func(config, 9, 1, 0, false)).toStrictEqual(['chín', 'trăm', 'mười']);
        expect(func(config, 9, 1, 0, true)).toStrictEqual(['chín', 'trăm', 'mười']);
    });

    test('Parse string number', () => {
        // Setup
        const func = Reader.parseNumberData;

        // Assert
        expect(func(config, '-1.23xy')).toBeNull();
        expect(func(config, '-12..3')).toBeNull();
        expect(func(config, '--12.34')).toBeNull();

        expect(func(config, '')).toStrictEqual({
            isNegative: false,
            digits: [0, 0, 0],
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
    });

    test('Read before point', () => {
        // Setup
        const func = Reader.readBeforePoint;

        // Assert
        expect(func(config, [])).toStrictEqual([]);
        expect(func(config, [0, 0, 0])).toStrictEqual(['không']);
        expect(func(config, [1, 0, 3])).toStrictEqual(['một', 'trăm', 'lẻ', 'ba']);
        expect(func(config, [6, 2, 3, 0, 0, 0]))
            .toStrictEqual(['sáu', 'trăm', 'hai', 'mươi', 'ba', 'nghìn']);
        expect(func(config, [0, 1, 5, 7, 2, 5]))
            .toStrictEqual(['mười', 'lăm', 'nghìn', 'bảy', 'trăm', 'hai', 'mươi', 'lăm']);
        expect(func(config, [])).toStrictEqual([]);
    });

    test('Read after point', () => {
        // Setup
        const func = Reader.readAfterPoint;

        // Assert
        expect(func(config, [])).toStrictEqual([]);
        expect(func(config, [1])).toStrictEqual(['một']);
        expect(func(config, [2, 4])).toStrictEqual(['hai', 'mươi', 'tư']);
        expect(func(config, [3, 0, 9])).toStrictEqual(['ba', 'trăm', 'lẻ', 'chín']);
        expect(func(config, [0, 0, 0, 7])).toStrictEqual(['không', 'không', 'không', 'bảy']);
        expect(func(config, [1, 2, 3, 4, 5])).toStrictEqual(['một', 'hai', 'ba', 'bốn', 'năm']);
    });

    test('Read number generally', () => {
        // Setup
        const func = (config: ReadingConfig, number: string) => {
            const numberData = Reader.parseNumberData(config, number);
            return numberData === null ? null : Reader.readNumber(config, numberData);
        };

        // Assert
        expect(func(config, '')).toBe('không');
        expect(func(config, '0')).toBe('không');
        expect(func(config, '000')).toBe('không');
        expect(func(config, '00.')).toBe('không');
        expect(func(config, '.00')).toBe('không');
        expect(func(config, '000.00')).toBe('không');
        expect(func(config, '02')).toBe('hai');
        expect(func(config, '15')).toBe('mười lăm');
        expect(func(config, '4065')).toBe('bốn nghìn không trăm sáu mươi lăm');
        expect(func(config, '06000')).toBe('sáu nghìn');
        expect(func(config, '1000024')).toBe('một triệu không trăm hai mươi tư');
        expect(func(config, '23010000')).toBe('hai mươi ba triệu không trăm mười nghìn');
        expect(func(config, '2030000305')).toBe('hai tỉ không trăm ba mươi triệu ba trăm lẻ năm');
        expect(func(config, '304.23')).toBe('ba trăm lẻ bốn chấm hai mươi ba');
        expect(func(config, '-0003.804')).toBe('âm ba chấm tám trăm lẻ bốn');
        expect(func(config, '-0.00001')).toBe('âm không chấm không không không không một');
    });
});

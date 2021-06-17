import { NumberData } from '../src/NumberData'
import { ReadingConfig } from '../src/ReadingConfig'
import {
    readTwoDigits,
    readThreeDigits,
    trimRedundantZeros,
    addLeadingZerosToFitGroup,
    parseNumberData,
    readBeforePoint,
    readAfterPoint,
    readNumber
} from '../src/Reader'

describe('Read the last two digits function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should return value', () => {
        expect(readTwoDigits(config, 0, 0, true)).toEqual([])
        expect(readTwoDigits(config, 0, 0, false)).toEqual(['không'])
        expect(readTwoDigits(config, 0, 3, true)).toEqual(['lẻ', 'ba'])
        expect(readTwoDigits(config, 0, 3, false)).toEqual(['ba'])

        expect(readTwoDigits(config, 1, 5, false)).toEqual(['mười', 'lăm'])
        expect(readTwoDigits(config, 1, 6, false)).toEqual(['mười', 'sáu'])
        expect(readTwoDigits(config, 1, 0, false)).toEqual(['mười'])

        expect(readTwoDigits(config, 5, 1, false)).toEqual(['năm', 'mươi', 'mốt'])
        expect(readTwoDigits(config, 5, 4, false)).toEqual(['năm', 'mươi', 'tư'])
        expect(readTwoDigits(config, 4, 4, false)).toEqual(['bốn', 'mươi', 'bốn'])
        expect(readTwoDigits(config, 8, 5, false)).toEqual(['tám', 'mươi', 'lăm'])
        expect(readTwoDigits(config, 8, 2, false)).toEqual(['tám', 'mươi', 'hai'])
        expect(readTwoDigits(config, 8, 0, false)).toEqual(['tám', 'mươi'])
    })
})

describe('Read three digits function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should return without zero hundred', () => {
        expect(readThreeDigits(config, 0, 0, 0, false)).toEqual(['không'])
        expect(readThreeDigits(config, 0, 0, 5, false)).toEqual(['năm'])
        expect(readThreeDigits(config, 3, 0, 0, false)).toEqual(['ba', 'trăm'])
        expect(readThreeDigits(config, 3, 0, 5, false)).toEqual(['ba', 'trăm', 'lẻ', 'năm'])
    })

    it('Should return with zero hundred', () => {
        expect(readThreeDigits(config, 0, 0, 0, true)).toEqual(['không', 'trăm'])
        expect(readThreeDigits(config, 3, 0, 0, true)).toEqual(['ba', 'trăm'])
        expect(readThreeDigits(config, 0, 0, 5, true)).toEqual(['không', 'trăm', 'lẻ', 'năm'])
        expect(readThreeDigits(config, 3, 0, 5, true)).toEqual(['ba', 'trăm', 'lẻ', 'năm'])
    })
})

describe('Trim redundant zeros function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should not trim', () => {
        expect(trimRedundantZeros(config, '')).toBe('')
    })

    it('Should only trim left', () => {
        expect(trimRedundantZeros(config, '0')).toBe('')
        expect(trimRedundantZeros(config, '000123')).toBe('123')
        expect(trimRedundantZeros(config, '00012300')).toBe('12300')
    })

    it('Should trim both left and right', () => {
        expect(trimRedundantZeros(config, '123.4')).toBe('123.4')
        expect(trimRedundantZeros(config, '0123.0004')).toBe('123.0004')
        expect(trimRedundantZeros(config, '001230.004500')).toBe('1230.0045')
    })
})

describe('Add leading zeros to fit group function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should not change', () => {
        expect(addLeadingZerosToFitGroup(config, '')).toBe('')
        expect(addLeadingZerosToFitGroup(config, '257')).toBe('257')
        expect(addLeadingZerosToFitGroup(config, '123456')).toBe('123456')
    })

    it('Should have the length divisible by 3', () => {
        expect(addLeadingZerosToFitGroup(config, '1')).toBe('001')
        expect(addLeadingZerosToFitGroup(config, '23')).toBe('023')
        expect(addLeadingZerosToFitGroup(config, '1234')).toBe('001234')
        expect(addLeadingZerosToFitGroup(config, '12345')).toBe('012345')
    })
})

describe('Parse string number function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should return null', () => {
        expect(parseNumberData(config, '-1.23xy')).toBeNull()
        expect(parseNumberData(config, '-12..3')).toBeNull()
        expect(parseNumberData(config, '--12.34')).toBeNull()
    })

    it('Should return empty data', () => {
        expect(parseNumberData(config, '')).toEqual({
            isNegative: false,
            digits: [0, 0, 0],
            digitsAfterPoint: []
        } as NumberData)
    })

    it('Should return value', () => {
        expect(parseNumberData(config, '123')).toEqual({
            isNegative: false,
            digits: [1, 2, 3],
            digitsAfterPoint: []
        } as NumberData)
        expect(parseNumberData(config, '-12.3')).toEqual({
            isNegative: true,
            digits: [0, 1, 2],
            digitsAfterPoint: [3]
        } as NumberData)
        expect(parseNumberData(config, '0031.141590000')).toEqual({
            isNegative: false,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData)
        expect(parseNumberData(config, '-0031.141590000')).toEqual({
            isNegative: true,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData)
    })
})

describe('Read before point function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should return empty', () => {
        expect(readBeforePoint(config, [])).toEqual([])
    })

    it('Should return value', () => {
        expect(readBeforePoint(config, [0, 0, 0])).toEqual(['không'])
        expect(readBeforePoint(config, [1, 0, 3])).toEqual(['một', 'trăm', 'lẻ', 'ba'])
        expect(readBeforePoint(config, [0, 1, 5, 7, 2, 5]))
            .toEqual(['mười', 'lăm', 'nghìn', 'bảy', 'trăm', 'hai', 'mươi', 'lăm'])
        expect(readBeforePoint(config, [6, 2, 3, 0, 0, 0]))
            .toEqual(['sáu', 'trăm', 'hai', 'mươi', 'ba', 'nghìn'])
    })
})

describe('Read after point function', () => {
    const config = new ReadingConfig()
    config.unit = []

    it('Should return empty value', () => {
        expect(readAfterPoint(config, [])).toEqual([])
    })

    it('Should return value', () => {
        expect(readAfterPoint(config, [1])).toEqual(['một'])
        expect(readAfterPoint(config, [2, 4])).toEqual(['hai', 'mươi', 'tư'])
        expect(readAfterPoint(config, [3, 0, 9])).toEqual(['ba', 'trăm', 'lẻ', 'chín'])
        expect(readAfterPoint(config, [0, 0, 0, 7])).toEqual(['không', 'không', 'không', 'bảy'])
        expect(readAfterPoint(config, [1, 2, 3, 4, 5])).toEqual(['một', 'hai', 'ba', 'bốn', 'năm'])
    })
})

describe('Read full string number', () => {
    const func = (config: ReadingConfig, number: string) => {
        const numberData = parseNumberData(config, number)
        return numberData === null ? null : readNumber(config, numberData)
    }
    const config = new ReadingConfig()
    config.unit = []

    it('Should return null', () => {
        expect(func(config, '1..23')).toBeNull()
        expect(func(config, '--1.23')).toBeNull()
        expect(func(config, '12_3')).toBeNull()
        expect(func(config, 'abc123')).toBeNull()
    })

    it('Should return zero', () => {
        expect(func(config, '')).toBe('không')
        expect(func(config, '0')).toBe('không')
        expect(func(config, '000')).toBe('không')
        expect(func(config, '00.')).toBe('không')
        expect(func(config, '.00')).toBe('không')
        expect(func(config, '000.00')).toBe('không')
    })

    it('Should return integer value', () => {
        expect(func(config, '02')).toBe('hai')
        expect(func(config, '15')).toBe('mười lăm')
        expect(func(config, '4065')).toBe('bốn nghìn không trăm sáu mươi lăm')
        expect(func(config, '06000')).toBe('sáu nghìn')
        expect(func(config, '1000024')).toBe('một triệu không trăm hai mươi tư')
        expect(func(config, '23010000')).toBe('hai mươi ba triệu không trăm mười nghìn')
        expect(func(config, '2030000305')).toBe('hai tỉ không trăm ba mươi triệu ba trăm lẻ năm')
    })

    it('Should return double value', () => {
        expect(func(config, '304.23')).toBe('ba trăm lẻ bốn chấm hai mươi ba')
        expect(func(config, '-0003.804')).toBe('âm ba chấm tám trăm lẻ bốn')
        expect(func(config, '-0.00001')).toBe('âm không chấm không không không không một')
    })
})

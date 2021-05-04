import NumberData from '../src/NumberData'
import ReadingConfig from '../src/ReadingConfig'
import Reader from '../src/Reader'

describe('Read the last two digits function', () => {
    const func = Reader.readTwoDigits
    const config = new ReadingConfig()
    config.unit = []

    it('Should return value', () => {
        expect(func(config, 0, 0, true)).toEqual([])
        expect(func(config, 0, 0, false)).toEqual(['không'])
        expect(func(config, 0, 3, true)).toEqual(['lẻ', 'ba'])
        expect(func(config, 0, 3, false)).toEqual(['ba'])

        expect(func(config, 1, 5, false)).toEqual(['mười', 'lăm'])
        expect(func(config, 1, 6, false)).toEqual(['mười', 'sáu'])
        expect(func(config, 1, 0, false)).toEqual(['mười'])

        expect(func(config, 5, 1, false)).toEqual(['năm', 'mươi', 'mốt'])
        expect(func(config, 5, 4, false)).toEqual(['năm', 'mươi', 'tư'])
        expect(func(config, 4, 4, false)).toEqual(['bốn', 'mươi', 'bốn'])
        expect(func(config, 8, 5, false)).toEqual(['tám', 'mươi', 'lăm'])
        expect(func(config, 8, 2, false)).toEqual(['tám', 'mươi', 'hai'])
        expect(func(config, 8, 0, false)).toEqual(['tám', 'mươi'])
    })
})

describe('Read three digits function', () => {
    const func = Reader.readThreeDigits
    const config = new ReadingConfig()
    config.unit = []

    it('Should return without zero hundred', () => {
        expect(func(config, 0, 0, 0, false)).toEqual(['không'])
        expect(func(config, 0, 0, 5, false)).toEqual(['năm'])
        expect(func(config, 3, 0, 0, false)).toEqual(['ba', 'trăm'])
        expect(func(config, 3, 0, 5, false)).toEqual(['ba', 'trăm', 'lẻ', 'năm'])
    })

    it('Should return with zero hundred', () => {
        expect(func(config, 0, 0, 0, true)).toEqual(['không', 'trăm'])
        expect(func(config, 3, 0, 0, true)).toEqual(['ba', 'trăm'])
        expect(func(config, 0, 0, 5, true)).toEqual(['không', 'trăm', 'lẻ', 'năm'])
        expect(func(config, 3, 0, 5, true)).toEqual(['ba', 'trăm', 'lẻ', 'năm'])
    })
})

describe('Parse string number function', () => {
    const func = Reader.parseNumberData
    const config = new ReadingConfig()
    config.unit = []

    it('Should return null', () => {
        expect(func(config, '-1.23xy')).toBeNull()
        expect(func(config, '-12..3')).toBeNull()
        expect(func(config, '--12.34')).toBeNull()
    })

    it('Should return empty data', () => {
        expect(func(config, '')).toEqual({
            isNegative: false,
            digits: [0, 0, 0],
            digitsAfterPoint: []
        } as NumberData)
    })

    it('Should return value', () => {
        expect(func(config, '123')).toEqual({
            isNegative: false,
            digits: [1, 2, 3],
            digitsAfterPoint: []
        } as NumberData)
        expect(func(config, '-12.3')).toEqual({
            isNegative: true,
            digits: [0, 1, 2],
            digitsAfterPoint: [3]
        } as NumberData)
        expect(func(config, '0031.141590000')).toEqual({
            isNegative: false,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData)
        expect(func(config, '-0031.141590000')).toEqual({
            isNegative: true,
            digits: [0, 3, 1],
            digitsAfterPoint: [1, 4, 1, 5, 9]
        } as NumberData)
    })
})

describe('Read before point function', () => {
    const func = Reader.readBeforePoint
    const config = new ReadingConfig()
    config.unit = []

    it('Should return empty', () => {
        expect(func(config, [])).toEqual([])
    })

    it('Should return value', () => {
        expect(func(config, [0, 0, 0])).toEqual(['không'])
        expect(func(config, [1, 0, 3])).toEqual(['một', 'trăm', 'lẻ', 'ba'])
        expect(func(config, [0, 1, 5, 7, 2, 5]))
            .toEqual(['mười', 'lăm', 'nghìn', 'bảy', 'trăm', 'hai', 'mươi', 'lăm'])
        expect(func(config, [6, 2, 3, 0, 0, 0]))
            .toEqual(['sáu', 'trăm', 'hai', 'mươi', 'ba', 'nghìn'])
    })
})

describe('Read after point function', () => {
    const func = Reader.readAfterPoint
    const config = new ReadingConfig()
    config.unit = []

    it('Should return empty value', () => {
        expect(func(config, [])).toEqual([])
    })

    it('Should return value', () => {
        expect(func(config, [1])).toEqual(['một'])
        expect(func(config, [2, 4])).toEqual(['hai', 'mươi', 'tư'])
        expect(func(config, [3, 0, 9])).toEqual(['ba', 'trăm', 'lẻ', 'chín'])
        expect(func(config, [0, 0, 0, 7])).toEqual(['không', 'không', 'không', 'bảy'])
        expect(func(config, [1, 2, 3, 4, 5])).toEqual(['một', 'hai', 'ba', 'bốn', 'năm'])
    })
})

describe('Read full string number', () => {
    const func = (config: ReadingConfig, number: string) => {
        const numberData = Reader.parseNumberData(config, number)
        return numberData === null ? null : Reader.readNumber(config, numberData)
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

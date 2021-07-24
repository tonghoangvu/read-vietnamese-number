import { trimLeft, trimRight } from '../src/Utils'

describe('Trim left function', () => {
	it('Should return empty', () => {
		expect(trimLeft('', '')).toBe('')
		expect(trimLeft('', 'x')).toBe('')
		expect(trimLeft('', 'xy')).toBe('')
	})

	it('Should return itself', () => {
		expect(trimLeft('abc', '')).toBe('abc')
		expect(trimLeft('abc', 'x')).toBe('abc')
		expect(trimLeft('abc', 'xy')).toBe('abc')
	})

	it('Should trim all leading specified characters', () => {
		expect(trimLeft('abc', 'a')).toBe('bc')
		expect(trimLeft('abc', 'ab')).toBe('bc')
		expect(trimLeft('aaababc', 'a')).toBe('babc')
	})
})

describe('Trim right function', () => {
	it('Should return empty', () => {
		expect(trimRight('', '')).toBe('')
		expect(trimRight('', 'x')).toBe('')
		expect(trimRight('', 'xy')).toBe('')
	})

	it('Should return itself', () => {
		expect(trimRight('abc', '')).toBe('abc')
		expect(trimRight('abc', 'x')).toBe('abc')
		expect(trimRight('abc', 'xy')).toBe('abc')
		expect(trimRight('abc', 'bc')).toBe('abc')
	})

	it('Should trim all trailing specified characters', () => {
		expect(trimRight('abc', 'c')).toBe('ab')
		expect(trimRight('abc', 'cb')).toBe('ab')
		expect(trimRight('abccccc', 'c')).toBe('ab')
	})
})

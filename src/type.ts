export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Period = [Digit, Digit, Digit]
export type InputNumber = string | bigint

export class RvnError extends Error {}
export class InvalidFormatError extends RvnError {}
export class InvalidNumberError extends RvnError {}

export interface NumberData {
	isNegative: boolean
	integralPart: Period[]
	fractionalPart: Digit[]
}

export class ReadingConfig {
	public separator = ' '
	public unit = ['đơn', 'vị']
	public negativeSign = '-'
	public pointSign = '.'
	public thousandSign = ','
	public periodSize = 3
	public filledDigit = '0'

	public digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
	public units = [[], ['nghìn'], ['triệu'], ['tỉ']]

	public negativeText = 'âm'
	public pointText = 'chấm'
	public oddText = 'lẻ'
	public tenText = 'mười'
	public hundredText = 'trăm'

	public oneToneText = 'mốt'
	public fourToneText = 'tư'
	public fiveToneText = 'lăm'
	public tenToneText = 'mươi'
}

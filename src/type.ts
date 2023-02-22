export type Period = [number, number, number]
export type InputNumber = string | bigint | number | null | undefined

export class RvnError extends Error {}
export class InvalidFormatError extends RvnError {}
export class InvalidNumberError extends RvnError {}
export class UnitNotEnoughError extends RvnError {}

export interface NumberData {
	isNegative: boolean
	integralPart: Period[]
	fractionalPart: number[]
}

export class ReadingConfig {
	public separator = ' '
	public unit = ['đơn', 'vị']
	public negativeSign = '-'
	public pointSign = '.'
	public thousandSign = ','
	public periodSize = 3
	public filledDigit = '0'

	public digits = [
		'không',
		'một',
		'hai',
		'ba',
		'bốn',
		'năm',
		'sáu',
		'bảy',
		'tám',
		'chín',
	]
	public units = [
		[],
		['nghìn'],
		['triệu'],
		['tỉ'],
		['nghìn', 'tỉ'],
		['triệu', 'tỉ'],
		['tỉ', 'tỉ'],
	]

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

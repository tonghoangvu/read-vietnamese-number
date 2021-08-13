import { Period } from './types'

/**
 * Interface chứa dữ liệu số đã phân tích.
 * Thực hiện đọc số là đọc trên interface này.
 */
export interface NumberData {
	isNegative: boolean
	integralPart: Period[]
	fractionalPart: number[]
}

/**
 * Interface chứa dữ liệu số đã phân tích.
 * Thực hiện đọc số là đọc trên interface này.
 */
export interface NumberData {
	isNegative: boolean
	integralPart: number[]
	fractionalPart: number[]
}

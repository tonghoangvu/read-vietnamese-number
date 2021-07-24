/**
 * Interface chứa dữ liệu số đã phân tích.
 * Thực hiện đọc số là đọc trên interface này.
 */
export interface NumberData {
	isNegative: boolean
	digits: number[] // Độ dài luôn chia hết cho 3
	digitsAfterPoint: number[] // Độ dài bất kì
}

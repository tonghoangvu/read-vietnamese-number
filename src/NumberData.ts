/**
 * Interface chứa data của số đã phân tích.
 * Dùng interface này để thực hiện đọc số.
 */
interface NumberData {
    isNegative: boolean;
    digits: number[];  // Độ dài luôn chia hết cho 3
    digitsAfterPoint: number[];  // Độ dài bất kì
}

export default NumberData;

/**
 * Interface chứa data của số đã phân tích.
 * Dùng interface này để thực hiện đọc số.
 */
interface NumberData {
    isNegative: boolean;
    digits: number[];
    digitsAfterPoint: number[];
}

export default NumberData;

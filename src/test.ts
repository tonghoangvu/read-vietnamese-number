/* eslint-disable no-console */

import { NumberData, ReadingConfig, Reader } from './index';

// Tạo & điều chỉnh cấu hình phù hợp
const config = new ReadingConfig();
config.unit = ['đơn', 'vị'];

// Danh sách số cần đọc
const numbers: string[] = [
    '-3.14', '44.32.33', '2.1'
];

// Đọc lần lượt từng số trong danh sách
for (const number of numbers) {
    // Phân tích số thành dạng NumberData
    const numberData: NumberData | null = Reader.parseNumberData(config, number);

    // Nếu phân tích không được thì báo lỗi, ngược lại đọc số
    if (numberData == null)
        console.error(number, '=', 'số không hợp lệ');
    else
        console.log(number, '=', Reader.readNumber(config, numberData));
}

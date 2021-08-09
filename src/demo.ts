/* eslint-disable no-console */

import { ReadingConfig, parseNumberData, readNumber } from './index'

// Cấu hình đọc số
const config = new ReadingConfig()
config.unit = ['đơn', 'vị']

// Các số cần đọc
const numbers = [
	'-3.14', '44.32.33', '2.1'
]

// Đọc lần lượt từng số
for (const number of numbers) {
	// Phân tích số thành dạng đọc được
	const numberData = parseNumberData(config, number)

	// Thực hiện đọc số
	if (numberData === null)
		console.error(`Số ${ number }: không hợp lệ`)
	else
		console.log(`Số ${ number }: ${ readNumber(config, numberData) }`)
}

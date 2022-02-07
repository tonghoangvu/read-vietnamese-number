/* eslint-disable no-console */

import {
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	parseNumberData,
	readNumber,
} from './index' // Hoặc "read-vietnamese-number"

// Cấu hình đọc số
const config = new ReadingConfig()
config.unit = ['đơn', 'vị']

// Các số cần đọc
const numbers = ['-3.14', '44.32.33', '2.1']

// Đọc lần lượt từng số
for (const number of numbers) {
	try {
		// Phân tích và đọc số đã phân tích
		const numberData = parseNumberData(config, number)
		const result = readNumber(config, numberData)
		console.log(`Số ${number}: ${result}`)
	} catch (e) {
		// Xử lý từng loại lỗi
		if (e instanceof InvalidNumberError)
			console.error(`Số ${number}: không hợp lệ`)
		else if (e instanceof UnitNotEnoughError)
			console.warn(`Số ${number}: không đủ đơn vị`)
	}
}

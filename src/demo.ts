/* eslint-disable no-console */

import * as readline from 'readline'
import {
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	parseNumberData,
	readNumber,
} from './index' // Hoặc 'read-vietnamese-number'

async function input(
	reader: readline.Interface,
	question: string,
): Promise<string> {
	return new Promise(resolve => {
		reader.question(question, number => resolve(number))
	})
}

function read(config: ReadingConfig, number: string) {
	try {
		// Phân tích và đọc số đã phân tích
		const numberData = parseNumberData(config, number)
		console.log(readNumber(config, numberData))
	} catch (e) {
		// Xử lý từng loại lỗi
		if (e instanceof InvalidNumberError) console.error('Số không hợp lệ')
		else if (e instanceof UnitNotEnoughError)
			console.warn('Không đủ đơn vị')
	}
}

async function run() {
	// Tạo đối tượng readline
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	// Cấu hình đọc số
	const config = new ReadingConfig()
	config.unit = ['đơn', 'vị']

	let isBreak = false
	do {
		// Nhập số và hiển thị kết quả
		const numberAnswer: string = await input(reader, 'Nhập số: ')
		read(config, numberAnswer)

		// Tiếp tục hay không
		const continueAnswer: string = await input(reader, 'Tiếp tục (y/n): ')
		if (continueAnswer.toLowerCase() === 'n') isBreak = true
		else console.log()
	} while (isBreak === false)
	reader.close()
}
run()

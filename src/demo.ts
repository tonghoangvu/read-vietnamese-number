/* eslint-disable no-console */

import * as readline from 'readline'
import {
	InvalidFormatError,
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	doReadNumber,
} from './index' // or 'read-vietnamese-number'

async function input(
	reader: readline.Interface,
	question: string
): Promise<string> {
	return new Promise((resolve) => {
		reader.question(question, (number) => resolve(number))
	})
}

function read(config: ReadingConfig, number: string): void {
	try {
		const result = doReadNumber(config, number)
		console.log(result)
	} catch (err) {
		if (err instanceof InvalidFormatError) {
			console.error('Định dạng input không hợp lệ')
		} else if (err instanceof InvalidNumberError) {
			console.error('Số không hợp lệ')
		} else if (err instanceof UnitNotEnoughError) {
			console.error('Không đủ đơn vị đọc số')
		}
	}
}

async function run(): Promise<void> {
	// Prepare the console reader
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	// Create reading config
	const config = new ReadingConfig()
	config.unit = ['đơn', 'vị']

	let isBreak = false
	do {
		// Input a number and read it
		const numberAnswer: string = await input(reader, 'Enter a number: ')
		read(config, numberAnswer)

		// Ask for continue or not
		const continueAnswer: string = await input(reader, 'Continue (y/n): ')
		if (continueAnswer.toLowerCase() === 'n') {
			isBreak = true
		} else {
			console.log() // New line
		}
	} while (isBreak === false)
	reader.close()
}
run()

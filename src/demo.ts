/* eslint-disable no-console */

import * as readline from 'readline'
import {
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	parseNumberData,
	readNumber,
} from './index' // Or 'read-vietnamese-number'

async function input(
	reader: readline.Interface,
	question: string,
): Promise<string> {
	return new Promise((resolve) => {
		reader.question(question, (number) => resolve(number))
	})
}

function read(config: ReadingConfig, number: string) {
	try {
		// Parse the number and start reading
		const numberData = parseNumberData(config, number)
		console.log(readNumber(config, numberData))
	} catch (e) {
		// Handle errors
		if (e instanceof InvalidNumberError) console.error('Số không hợp lệ')
		else if (e instanceof UnitNotEnoughError)
			console.warn('Không đủ đơn vị')
	}
}

async function run() {
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
		if (continueAnswer.toLowerCase() === 'n') isBreak = true
		else console.log()
	} while (isBreak === false)
	reader.close()
}
run()

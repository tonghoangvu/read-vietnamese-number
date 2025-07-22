import {
	doReadNumber,
	ReadingConfig,
	InvalidNumberError,
} from 'https://unpkg.com/read-vietnamese-number'

const number = document.getElementById('number')
const result = document.getElementById('result')

if (number === null || result === null) {
	throw new Error('DOM elements not found')
} else {
	number.addEventListener('input', handleInput)
}

function handleInput() {
	const value = number['value'] ?? ''
	try {
		const config = new ReadingConfig()
		const output = doReadNumber(config, value)
		updateResult(value, output, true)
	} catch (error) {
		if (error instanceof InvalidNumberError) {
			updateResult(value, 'Invalid number error', false)
		} else {
			updateResult(value, 'Unexpected error', false)
			throw error
		}
	}
}

function updateResult(value, output, isSuccess) {
	result.hidden = !value
	result.textContent = output
	if (isSuccess) {
		result.classList.add('alert-success')
		result.classList.remove('alert-warning')
	} else {
		result.classList.add('alert-warning')
		result.classList.remove('alert-success')
	}
}

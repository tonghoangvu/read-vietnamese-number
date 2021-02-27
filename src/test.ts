/* eslint-disable no-console */

import { NumberData, ReadingConfig, Reader } from './index';

// Create & modify reading config
const config = new ReadingConfig();
config.unit = ['đồng'];

// List number to read
const numbers: string[] = [
    '-3.14'
];

// Start reading
for (const number of numbers) {
    const numberData: NumberData | null = Reader.parseNumberData(config, number);
    if (numberData == null)
        console.error(number, '=', 'Number is invalid');
    else
        console.log(number, '=', Reader.readNumber(config, numberData));
}

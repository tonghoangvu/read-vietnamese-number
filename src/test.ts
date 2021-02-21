/* eslint-disable no-console */

import { NumberData, ReadingConfig, Reader } from './index';

// Create & modify reading config
const config = new ReadingConfig();
config.unit = ['đồng'];

// List number to read
const numbers: string[] = [
    '3.14'
];

// Start reading
for (const number of numbers) {
    const numberData: NumberData = Reader.parseNumberData(config, number);
    console.log(number, '=', Reader.readNumber(config, numberData));
}

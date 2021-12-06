const before = new Date().getTime();
const { getNextDay, getTotal } = require('./fish');
const { getInputs, getFileData, toInputMap } = require('./util');

const NUM_DAYS = 80;
const data = getFileData('input.txt');
const inputs = getInputs(data);

let inputMap = toInputMap(inputs);
for (let _ in [...Array(NUM_DAYS).keys()]) {
    inputMap = getNextDay(inputMap);
}

const after = new Date().getTime();
console.log(
    `Lanternfish after ${NUM_DAYS} days: ${getTotal(inputMap)} (${
        after - before
    } ms)`
);

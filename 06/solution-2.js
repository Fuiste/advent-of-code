const before = new Date().getTime();
const { getNextDay, getTotal } = require('./fish');
const { getInputs, getFileData, toInputMap, range } = require('./util');

const NUM_DAYS = 256;

const runSim = () => {
    const data = getFileData('input.txt');
    const inputs = getInputs(data);

    let inputMap = toInputMap(inputs);
    for (let _ in [...Array(NUM_DAYS).keys()]) {
        inputMap = getNextDay(inputMap);
    }

    return getTotal(inputMap);
};

const total = runSim();
const after = new Date().getTime();
console.log(
    `Lanternfish after ${NUM_DAYS} days: ${total} (${after - before} ms)`
);

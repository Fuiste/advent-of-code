const before = new Date().getTime();
const { getInputs, getFileData, toInputMap, range } = require('./util');

const SPAWN_STATE = 8;
const RESET_STATE = 6;
const NUM_DAYS = 256;

const getNextDay = (inputMap) => {
    const newMap = {};
    const zeroes = inputMap[0] || 0;
    const remaining = range(1, 8);

    for (let i in remaining) {
        const extant = inputMap[remaining[i]] || 0;
        newMap[remaining[i] - 1] = extant;
    }

    const sixes = newMap[RESET_STATE] || 0;
    newMap[SPAWN_STATE] = zeroes;
    newMap[RESET_STATE] = zeroes + sixes;

    return newMap;
};

const getTotal = (inputMap) => {
    return Object.values(inputMap).reduce((total, cur) => {
        return total + cur;
    }, 0);
};

const data = getFileData('input.txt');
const inputs = getInputs(data);
let inputMap = toInputMap(inputs);

for (let i in [...Array(NUM_DAYS).keys()]) {
    inputMap = getNextDay(inputMap);
}

const after = new Date().getTime();
console.log(
    `Lanternfish after 256 days ${getTotal(inputMap)} (${after - before} ms)`
);

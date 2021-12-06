const before = new Date().getTime();
const { getInputs, getFileData } = require('./util');

const SPAWN_STATE = 8;
const RESET_STATE = 6;
const NUM_DAYS = 80;

const getNextDay = (inputs) => {
    return inputs.reduce((newList, input) => {
        if (input === 0) {
            newList.push(SPAWN_STATE, RESET_STATE);
        } else {
            newList.push(input - 1);
        }

        return newList;
    }, []);
};

const data = getFileData('input.txt');
let inputs = getInputs(data);

for (let i in [...Array(NUM_DAYS).keys()]) {
    inputs = getNextDay(inputs);
}

const after = new Date().getTime();
console.log(
    `Lanternfish after 80 days ${inputs.length} (${after - before} ms)`
);

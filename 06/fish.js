const { range } = require('../base-util');

const SPAWN_STATE = 8;
const RESET_STATE = 6;

const _permuteMapWithoutSpawns = (inputMap) => {
    const newMap = {};
    const remaining = range(1, SPAWN_STATE);

    for (let i in remaining) {
        const extant = inputMap[remaining[i]] || 0;
        newMap[remaining[i] - 1] = extant;
    }

    return newMap;
};

exports.getNextDay = (inputMap) => {
    const newMap = _permuteMapWithoutSpawns(inputMap);
    const numSpawning = inputMap[0] || 0;
    const numAtReset = newMap[RESET_STATE] || 0;

    newMap[SPAWN_STATE] = numSpawning;
    newMap[RESET_STATE] = numSpawning + numAtReset;

    return newMap;
};

exports.getTotal = (inputMap) => {
    return Object.values(inputMap).reduce((total, cur) => {
        return total + cur;
    }, 0);
};

const before = new Date().getTime();
const { getFileData } = require('../base-util');
const { findOptimalPosition } = require('./fuel');
const { getInitialPositions } = require('./util');

const data = getFileData('input.txt');
const positions = getInitialPositions(data);
const [optimal, cost] = findOptimalPosition(positions, true);

const after = new Date().getTime();
console.log(
    `Optimal position w/ increasing cost: ${optimal} Cost: ${cost} (${
        after - before
    } ms)`
);

const { getFileData } = require('../base-util');
const { findLocalMins } = require('./maps');
const { getHeightMap } = require('./util');
const before = new Date().getTime();

const scoreForLocalMins = (localMins) =>
    localMins.reduce((acc, cur) => acc + cur + 1, 0);

const data = getFileData('input.txt');
const heightMaps = getHeightMap(data);
const mins = findLocalMins(heightMaps);
const ans = scoreForLocalMins(mins);

const after = new Date().getTime();
console.log(`Sum of risk levels: ${ans} (${after - before} ms)`);

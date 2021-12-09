const before = new Date().getTime();
const { getFileData } = require('../base-util');
const { findLocalMins, calculateBasinSize } = require('./maps');
const { getHeightMap } = require('./util');

const getSortedBasinSizes = (depthMap) => {
    const basins = [];
    findLocalMins(depthMap, (rIdx, cIdx) => {
        const size = calculateBasinSize(depthMap, rIdx, cIdx);
        basins.push(size);
    });

    return basins.sort((b1, b2) => b2 - b1);
};

const data = getFileData('input.txt');
const heightMaps = getHeightMap(data);
const [first, second, third] = getSortedBasinSizes(heightMaps);
const ans = first * second * third;

const after = new Date().getTime();
console.log(`Product of 3 larges basins: ${ans} (${after - before} ms)`);

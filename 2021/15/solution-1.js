const { getFileData } = require('../base-util');
const { findSmallestRiskPath } = require('./dijkstra');
const { getMap } = require('./util');
const before = new Date().getTime();

const data = getFileData('input.txt');
const map = getMap(data);
const ans = findSmallestRiskPath(map);

const after = new Date().getTime();
console.log(`Smallest risk path: ${ans} (${after - before} ms)`);

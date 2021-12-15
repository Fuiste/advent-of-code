const { getFileData } = require('../base-util');
const { findSmallestRiskPath } = require('./dijkstra');
const { getMap, getFullMap } = require('./util');
const before = new Date().getTime();

const data = getFileData('input.txt');
const map = getMap(data);
const fullMap = getFullMap(map);
const ans = findSmallestRiskPath(fullMap);

const after = new Date().getTime();
console.log(`Smallest risk path (full cave): ${ans} (${after - before} ms)`);

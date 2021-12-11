const before = new Date().getTime();

const { getFileData } = require('../base-util');
const { simulateSteps } = require('./flashes');
const { getOctopusMap } = require('./util');

const data = getFileData('input.txt');
const oMap = getOctopusMap(data);
const flashes = simulateSteps(oMap, 100);

const after = new Date().getTime();
console.log(`Flashes after 100 steps: ${flashes} (${after - before} ms)`);

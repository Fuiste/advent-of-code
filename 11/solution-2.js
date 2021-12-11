const before = new Date().getTime();

const { getFileData } = require('../base-util');
const { firstAllFlash } = require('./flashes');
const { getOctopusMap } = require('./util');

const data = getFileData('input.txt');
const oMap = getOctopusMap(data);
const allStep = firstAllFlash(oMap);

const after = new Date().getTime();
console.log(`First synchronized step: ${allStep} (${after - before} ms)`);

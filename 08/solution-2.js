const before = new Date().getTime();
const { getFileData } = require('../base-util');
const { decodeSignal } = require('./decode');
const { getSignalsAndOutput } = require('./util');

const data = getFileData('./input.txt');
const [signalGroups, outputGroups] = getSignalsAndOutput(data);
const total = decodeSignal(signalGroups, outputGroups);

const after = new Date().getTime();
console.log(`Total of outputs: ${total} (${after - before} ms)`);

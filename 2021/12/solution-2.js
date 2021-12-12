const { getFileData } = require('../base-util');
const { traverseCaves } = require('./traverse');
const { makeConnectionGraph } = require('./util');
const before = new Date().getTime();

const data = getFileData('input.txt');
const connections = makeConnectionGraph(data);
const numPaths = traverseCaves(connections, true);

const after = new Date().getTime();
console.log(
    `Number of paths (allowing revisit): ${numPaths} (${after - before} ms)`
);

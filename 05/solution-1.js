const before = new Date().getTime();
const { getFileData } = require('../base-util');
const { calculateIntersectionGrid } = require('./grids');
const { getVectors } = require('./util');

const data = getFileData('input.txt');
const vectors = getVectors(data);
const area = calculateIntersectionGrid(vectors, false);

const after = new Date().getTime();
console.log(`Intersected area ${area} (${after - before} ms)`);

const before = new Date().getTime();
const { calculateIntersectionGrid } = require('./grids');
const { getFileData, getVectors } = require('./util');

const data = getFileData('input.txt');
const vectors = getVectors(data);
const area = calculateIntersectionGrid(vectors, true);

const after = new Date().getTime();
console.log(`Intersected area with diagonals ${area} (${after - before} ms)`);
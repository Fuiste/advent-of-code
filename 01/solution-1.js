const fs = require('fs');
const before = new Date().getTime();

const data = fs.readFileSync('./input.txt', 'utf8');
const depthStrings = data.split('\n');

let numDrops = 0;

if (depthStrings.length > 1) {
    const depths = depthStrings.map(parseFloat);

    numDrops = depths.filter((depth, idx) => {
        return idx !== 0 && depth > depths[idx - 1];
    }).length;
}

const after = new Date().getTime();
console.log(`The depth increased ${numDrops} times (${after - before} ms)`);

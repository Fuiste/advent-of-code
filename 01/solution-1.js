const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const depthStrings = data.split('\n');

let numDrops = 0;

if (depthStrings.length > 1) {
    const depths = depthStrings.map(parseFloat);

    numDrops = depths.filter((depth, idx) => {
        return idx !== 0 && depth > depths[idx - 1];
    }).length;
}

console.log(`The depth increased ${numDrops} times`);
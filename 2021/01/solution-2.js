const fs = require('fs');
const before = new Date().getTime();

const data = fs.readFileSync('./input.txt', 'utf8');
const depthStrings = data.split('\n');

let numDrops = 0;

if (depthStrings.length > 2) {
    const depths = depthStrings.map(parseFloat);

    const sums = Array.from(Array(depths.length - 2)).map((_, idx) => {
        return depths[idx + 2] + depths[idx + 1] + depths[idx];
    });

    numDrops = sums.filter((sum, idx) => {
        return idx !== 0 && sum > sums[idx - 1];
    }).length;
}

const after = new Date().getTime();
console.log(
    `The 3-measurement sum increased ${numDrops} times (${after - before} ms)`
);

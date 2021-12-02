const before = new Date().getTime();
const fs = require('fs');

const stream = fs.createReadStream('./input.txt', 'utf8');

let numDrops = 0;

stream.on('data', (chunk) => {
    const depths = chunk.split('\n').map(parseFloat);
    const sums = Array.from(Array(depths.length - 2)).map((_, idx) => {
        return depths[idx + 2] + depths[idx + 1] + depths[idx];
    });

    numDrops += sums.filter((sum, idx) => {
        return idx !== 0 && sum > sums[idx - 1];
    }).length;
});

stream.on('end', () => {
    const after = new Date().getTime();
    console.log(
        `The 3-measurement sum increased ${numDrops} times (${
            after - before
        } ms)`
    );
});

stream.resume();

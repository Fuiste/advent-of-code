const before = new Date().getTime();

const fs = require('fs');

const FORWARD = 'forward';
const UP = 'up';
const DOWN = 'down';

const data = fs.readFileSync('./input.txt', 'utf8');
const commandStrings = data.split('\n');

let horizontal = 0;
let depth = 0;

if (commandStrings.length > 0) {
    commandStrings.forEach((s) => {
        const [command, distString] = s.split(' ');
        const dist = parseFloat(distString);

        switch (command) {
            case FORWARD: {
                horizontal += dist;
                break;
            }
            case UP: {
                depth -= dist;
                break;
            }
            case DOWN: {
                depth += dist;
                break;
            }
        }
    });
}

const after = new Date().getTime();
console.log(
    `Final horizontal * depth: ${horizontal * depth} (${after - before} ms)`
);

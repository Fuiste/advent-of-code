const { getFileData } = require('../base-util');
const { getCharArrays } = require('./util');
const before = new Date().getTime();

const OPENERS = new Set('{(<[');
const MAPPER = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};
const SCORES = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const calculateScore = (charArrays) => {
    const score = charArrays.reduce((acc, cur) => {
        let openClosures = [];

        for (let ch of cur) {
            if (OPENERS.has(ch)) {
                openClosures.push(ch);
            } else {
                const openCh = openClosures.pop();

                if (ch !== MAPPER[openCh]) {
                    acc += SCORES[ch];
                }
            }
        }

        return acc;
    }, 0);

    return score;
};

const data = getFileData('input.txt');
const inputLines = getCharArrays(data);
const ans = calculateScore(inputLines);

const after = new Date().getTime();
console.log(`Total error scores: ${ans} (${after - before} ms)`);

const before = new Date().getTime();
const { getFileData } = require('../base-util');
const { getCharArrays } = require('./util');

const OPENERS = new Set('{(<[');
const MAPPER = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};
const SCORES = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

const calculateScore = (charArrays) => {
    const scores = charArrays.map((cur) => {
        let openClosures = [];
        let score = 0;

        for (let ch of cur) {
            if (OPENERS.has(ch)) {
                openClosures.push(ch);
            } else {
                const openCh = openClosures.pop();

                if (ch !== MAPPER[openCh]) {
                    return 0;
                }
            }
        }

        while (openClosures.length) {
            const openCh = openClosures.pop();
            score *= 5;
            score += SCORES[MAPPER[openCh]];
        }

        return score;
    });

    const sorted = scores.filter((s) => s !== 0).sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
};

const data = getFileData('input.txt');
const inputLines = getCharArrays(data);
const ans = calculateScore(inputLines);

const after = new Date().getTime();
console.log(`Middle score of completable lines: ${ans} (${after - before} ms)
`);

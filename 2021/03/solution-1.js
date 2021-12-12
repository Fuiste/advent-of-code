const fs = require('fs');
const before = new Date().getTime();

const data = fs.readFileSync('./input.txt', 'utf8');
const inputStrings = data.split('\n');

let gammaRate = 0;
let epsilonRate = 0;

const existMoreOnes = (inputs, idx) => {
    const [zeroes, ones] = inputStrings.reduce(
        (tuple, curStr) => {
            const [curZeroes, curOnes] = tuple;

            return curStr[idx] === '0'
                ? [curZeroes + 1, curOnes]
                : [curZeroes, curOnes + 1];
        },
        [0, 0]
    );

    return ones > zeroes;
};

if (inputStrings.length > 0) {
    const sLen = inputStrings[0].length;
    let gammaStr = '';
    for (let i = 0; i < sLen; i++) {
        const moreOnes = existMoreOnes(inputStrings, i);
        if (moreOnes) {
            gammaStr += '1';
        } else {
            gammaStr += '0';
        }
    }

    for (let i = 1; i < gammaStr.length + 1; i++) {
        const shouldIncrementGamma = gammaStr[gammaStr.length - i] === '1';
        const curPowerOf2 = Math.pow(2, i - 1);

        if (shouldIncrementGamma) {
            gammaRate += curPowerOf2;
        } else {
            epsilonRate += curPowerOf2;
        }
    }
}

const after = new Date().getTime();
console.log(
    `Gamma rate ${gammaRate} Epsilon rate ${epsilonRate} Consumption: ${
        gammaRate * epsilonRate
    } (${after - before} ms)`
);

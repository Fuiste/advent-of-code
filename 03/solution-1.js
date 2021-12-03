const before = new Date().getTime();
const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const inputStrings = data.split('\n');

let gammaRate = 0;
let epsilonRate = 0;

if (inputStrings.length > 0) {
    const sLen = inputStrings[0].length;
    let gammaStr = '';
    for (let i = 0; i < sLen; i++) {
        let zeroes = 0;
        let ones = 0;

        for (let j = 0; j < inputStrings.length; j++) {
            if (inputStrings[j][i] === '0') {
                zeroes++;
            } else {
                ones++;
            }
        }

        if (ones > zeroes) {
            gammaStr += '1';
        } else {
            gammaStr += '0';
        }
    }

    for (let i = 1; i < gammaStr.length + 1; i++) {
        const addGamma = gammaStr[gammaStr.length - i] === '1';
        const toAdd = Math.pow(2, i - 1);
        if (addGamma) {
            gammaRate += toAdd;
        } else {
            epsilonRate += toAdd;
        }
    }
}

const after = new Date().getTime();
console.log(
    `Gamma rate ${gammaRate} Epsilon rate ${epsilonRate} Consumption: ${
        gammaRate * epsilonRate
    } (${after - before} ms)`
);

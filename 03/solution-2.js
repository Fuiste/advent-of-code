const before = new Date().getTime();
const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const inputStrings = data.split('\n');

let oxRating = 0;
let co2Rating = 0;

const toDecimal = (boolStr) => {
    let ans = 0;
    for (let i = 1; i < boolStr.length + 1; i++) {
        const toAdd = Math.pow(2, i - 1);
        if (boolStr[boolStr.length - i] === '1') {
            ans += toAdd;
        }
    }

    return ans;
};

const getDistribution = (arr, idx) => {
    let ones = 0;
    let zeroes = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][idx] === '0') {
            zeroes++;
        } else {
            ones++;
        }
    }

    return [zeroes, ones];
};

const filterOxygen = (arr, idx) => {
    const [zeroes, ones] = getDistribution(arr, idx);

    return arr.filter((it) => {
        const tgt = it[idx];
        if (zeroes > ones) {
            return tgt === '0';
        }

        return tgt === '1';
    });
};

const filterC02 = (arr, idx) => {
    const [zeroes, ones] = getDistribution(arr, idx);

    return arr.filter((it) => {
        const tgt = it[idx];
        if (ones < zeroes) {
            return tgt === '1';
        }

        return tgt === '0';
    });
};

const filterInputsUntilOne = (initialArr, filterFn) => {
    let idx = 0;
    let filtered = [...initialArr];
    while (filtered.length > 1) {
        filtered = filterFn(filtered, idx);
        idx++;
    }

    return filtered[0];
};

if (inputStrings.length > 0) {
    const oxRateStr = filterInputsUntilOne(inputStrings, filterOxygen);
    const co2RateStr = filterInputsUntilOne(inputStrings, filterC02);

    oxRating += toDecimal(oxRateStr);
    co2Rating += toDecimal(co2RateStr);
}

const after = new Date().getTime();
console.log(
    `Oxygen: ${oxRating} CO2: ${co2Rating} Life Support: ${
        oxRating * co2Rating
    } (${after - before} ms)`
);

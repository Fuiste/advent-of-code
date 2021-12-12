const { range } = require('../base-util');
const { intersect, difference, isEq } = require('./util');

const ZERO = new Set('abcfg');
const ONE = new Set('cf');
const TWO = new Set('acdeg');
const THREE = new Set('acdfg');
const FOUR = new Set('bcdf');
const FIVE = new Set('abdfg');
const SIX = new Set('abdefg');
const SEVEN = new Set('acf');
const EIGHT = new Set('abcdefg');
const NINE = new Set('abcdfg');

const _makeSignalKey = (signalSets) => {
    const signalMap = {};

    // Find easy translations
    for (let set of signalSets) {
        const { size } = set;

        if (size === ONE.size) signalMap[1] = set;
        else if (size === FOUR.size) signalMap[4] = set;
        else if (size === SEVEN.size) signalMap[7] = set;
        else if (size === EIGHT.size) signalMap[8] = set;
    }

    const withoutEasies = signalSets.filter(
        (s) =>
            s.size !== ONE.size &&
            s.size !== FOUR.size &&
            s.size !== SEVEN.size &&
            s.size !== EIGHT.size
    );

    signalMap[6] = withoutEasies.find(
        (set) => set.size === 6 && intersect(set, signalMap[1]).size === 1
    );
    signalMap[9] = withoutEasies.find(
        (set) => set.size === 6 && intersect(set, signalMap[4]).size === 4
    );
    signalMap[0] = withoutEasies.find(
        (set) => set.size === 6 && set !== signalMap[6] && set !== signalMap[9]
    );
    signalMap[3] = withoutEasies.find(
        (set) => set.size === 5 && intersect(set, signalMap[1]).size === 2
    );
    signalMap[5] = withoutEasies.find(
        (set) =>
            set.size === 5 &&
            intersect(set, signalMap[4]).size === 3 &&
            intersect(set, signalMap[1]).size === 1
    );
    signalMap[2] = withoutEasies.find(
        (set) => set.size === 5 && set !== signalMap[3] && set !== signalMap[5]
    );

    return signalMap;
};

const _decodeLine = (signalSets, outputSets) => {
    const signalMap = _makeSignalKey(signalSets);
    const outputStr = outputSets.reduce((str, set) => {
        const [outChar] = Object.entries(signalMap).find(([_, signalSet]) => {
            return signalSet && isEq(set, signalSet);
        });

        return `${str}${outChar}`;
    }, '');

    return parseInt(outputStr, 10);
};

exports.decodeSignal = (signalGroups, outputGroups) => {
    const outputs = [];
    let total = 0;

    for (let i in outputGroups) {
        const output = _decodeLine(signalGroups[i], outputGroups[i]);
        outputs.push(output);
        total += output;
    }

    return total;
};

const { getFileData } = require('../base-util');
const { getSignalsAndOutput } = require('./util');
const before = new Date().getTime();

const EASY_PATTERN_SIZES = { 1: 2, 4: 4, 7: 3, 8: 7 };

const numKnownOutputs = (outputs) => {
    const knownOutputs = outputs.reduce((acc, outputEntries) => {
        const knowns = outputEntries.filter((o) => {
            return !!Object.values(EASY_PATTERN_SIZES).find((s) => {
                return s === o.size;
            });
        });

        return acc + knowns.length;
    }, 0);

    return knownOutputs;
};

const data = getFileData('./input.txt');
const [_, outputs] = getSignalsAndOutput(data);
const numKnown = numKnownOutputs(outputs);

const after = new Date().getTime();
console.log(`Known outputs: ${numKnown} (${after - before} ms)`);

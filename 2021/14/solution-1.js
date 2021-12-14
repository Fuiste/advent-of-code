const { getFileData } = require('../base-util');
const { applyInsertions } = require('./polymer');
const { getInputAndInsertions, toCountTuples } = require('./util');
const before = new Date().getTime();

const getMostMinusLeast = (data) => {
    const [initialPairMap, insertionMap, finalPolymer] =
        getInputAndInsertions(data);
    const result = applyInsertions(initialPairMap, insertionMap, STEPS);
    const counts = toCountTuples(result, finalPolymer);

    return counts[counts.length - 1][1] - counts[0][1];
};

const STEPS = 10;
const data = getFileData('input.txt');
const ans = getMostMinusLeast(data);

const after = new Date().getTime();
console.log(`Most - least (${STEPS} steps): ${ans} (${after - before} ms)`);

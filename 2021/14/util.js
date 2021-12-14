exports.insert = (obj, key, curVal) => {
    const count = curVal !== undefined ? curVal : 1;

    if (obj[key]) obj[key] += count;
    else obj[key] = count;
};

exports.toPairs = (template) =>
    template.slice(1).map((s, idx) => [template[idx], s]);

exports.pairToString = (pair) => pair.join('');

exports.toCountMap = (arrayOfStrings) => {
    return arrayOfStrings.reduce((acc, cur) => {
        this.insert(acc, cur);

        return acc;
    }, {});
};

exports.getInputAndInsertions = (data) => {
    const lines = data.split('\n');
    const inputPairs = this.toPairs(lines[0].split(''));
    const input = this.toCountMap(inputPairs.map(this.pairToString));
    const insertions = lines.slice(2).reduce((acc, line) => {
        const [pairString, toInsert] = line.split(' -> ');

        acc[pairString] = toInsert;
        return acc;
    }, {});

    return [input, insertions, inputPairs[inputPairs.length - 1][1]];
};

exports.toCountTuples = (pairCountMap, finalPolymer) => {
    const polymerCounts = Object.entries(pairCountMap).reduce(
        (acc, [pair, count]) => {
            this.insert(acc, pair[0], count);

            return acc;
        },
        {}
    );
    this.insert(polymerCounts, finalPolymer);

    return Object.entries(polymerCounts).sort(
        ([_a, countA], [_b, countB]) => countA - countB
    );
};

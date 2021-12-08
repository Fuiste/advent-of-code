const toSets = (strings) => strings.map((s) => new Set(s));

exports.getSignalsAndOutput = (data) => {
    const lines = data.split('\n');
    const [signals, outputs] = lines.reduce(
        ([sigs, outs], line) => {
            const [signalStrings, outputStrings] = line
                .split(' | ')
                .map((s) => s.split(' '));

            sigs.push(toSets(signalStrings));
            outs.push(toSets(outputStrings));

            return [sigs, outs];
        },
        [[], []]
    );

    return [signals, outputs];
};

exports.intersect = (set1, set2) => {
    const intersection = new Set(
        [...set2].reduce((acc, v) => (set1.has(v) ? `${acc}${v}` : acc), '')
    );

    return intersection;
};

const difference = (set1, set2) => {
    const diff = new Set(
        [...set1].reduce((acc, v) => (!set2.has(v) ? `${acc}${v}` : acc), '')
    );

    return diff;
};

exports.difference = difference;

exports.isEq = (set1, set2) =>
    !!set1 &&
    !!set2 &&
    difference(set1, set2).size === 0 &&
    difference(set2, set1).size === 0;

const { pairToString, insert } = require('./util');

exports.applyInsertion = (initialPairMap, insertionRules) => {
    const pairCounts = [...Object.entries(initialPairMap)];
    const newPairMap = {};

    pairCounts.forEach(([pair, count]) => {
        const insertion = insertionRules[pair];

        if (insertion) {
            const [a, b] = pair;
            const first = pairToString([a, insertion]);
            const second = pairToString([insertion, b]);

            insert(newPairMap, first, count);
            insert(newPairMap, second, count);
            initialPairMap[pair] = 0;
        }
    });

    return newPairMap;
};

exports.applyInsertions = (initialPairMap, insertionRules, numSteps = 10) => {
    let curTemplate = { ...initialPairMap };

    for (let i = 0; i < numSteps; i++) {
        curTemplate = this.applyInsertion(curTemplate, insertionRules);
    }

    return curTemplate;
};

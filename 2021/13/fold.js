const { stringToMark, markToString } = require('./util');

const _shouldFold = ([x, y], [fx, fy]) =>
    (x > fx && fx !== 0) || (y > fy && fy !== 0);

const _makeFoldCoords = ([x, y], [fx, fy]) =>
    fx !== 0 ? [fx - (x - fx), y] : [x, fy - (y - fy)];

exports.doFold = (curMarks, [fx, fy]) => {
    const newMarks = new Set();

    [...curMarks].map(stringToMark).forEach(([x, y]) => {
        const newCoords = _shouldFold([x, y], [fx, fy])
            ? _makeFoldCoords([x, y], [fx, fy])
            : [x, y];

        newMarks.add(markToString(newCoords));
    });

    return newMarks;
};

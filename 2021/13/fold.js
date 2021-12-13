const { stringToMark, markToString } = require('./util');

const _shouldFold = ([x, y], [fx, fy]) =>
    (x > fx && fx !== 0) || (y > fy && fy !== 0);

const _makeFoldCoords = ([x, y], [fx, fy]) =>
    fx !== 0 ? [fx - (x - fx), y] : [x, fy - (y - fy)];

exports.doFold = (curMarks, [fx, fy]) => {
    const newMarks = new Set();

    curMarks.forEach((markStr) => {
        const [x, y] = stringToMark(markStr);

        if (_shouldFold([x, y], [fx, fy])) {
            newMarks.add(markToString(_makeFoldCoords([x, y], [fx, fy])));
        } else {
            newMarks.add(markStr);
        }
    });

    return newMarks;
};

const { range } = require('../base-util');
const { vectorType, IS_X, IS_Y, IS_DIAG } = require('./util');

const MARKED = 'X';
const INTERSECTED = 'I';

const _markXY = (gridState, x, y) => {
    const { grid } = gridState;

    if (!grid[x]) grid[x] = { [y]: MARKED };
    else if (!grid[x][y]) grid[x][y] = MARKED;
    else if (grid[x][y] === MARKED) {
        gridState.intersections += 1;
        grid[x][y] = INTERSECTED;
    }
};

const _markXRange = (gridState, { y1, x1, x2 }) => {
    const xRange = range(x1, x2);

    for (let i in xRange) {
        _markXY(gridState, xRange[i], y1);
    }
};

const _markYRange = (gridState, { x1, y1, y2 }) => {
    const yRange = range(y1, y2);

    for (let i in yRange) {
        _markXY(gridState, x1, yRange[i]);
    }
};

const _markDiagRange = (gridState, { x1, x2, y1, y2 }) => {
    const xDir = x2 > x1 ? 1 : -1;
    const yDir = y2 > y1 ? 1 : -1;
    const xRange = range(x1, x2);

    for (let i in xRange) {
        _markXY(gridState, x1 + i * xDir, y1 + i * yDir);
    }
};

exports.calculateIntersectionGrid = (vectors, calculateDiagonals = false) => {
    const gridState = { grid: {}, intersections: 0 };

    for (let v in vectors) {
        const vector = vectors[v];
        const vType = vectorType(vector);

        if (vType === IS_X) _markYRange(gridState, vector);
        else if (vType === IS_Y) _markXRange(gridState, vector);
        else if (calculateDiagonals && vType === IS_DIAG)
            _markDiagRange(gridState, vector);
    }

    return gridState.intersections;
};

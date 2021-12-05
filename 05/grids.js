const {
    makeGridWithIntersections: makeGrid,
    range,
    vectorType,
    IS_X,
    IS_Y,
    IS_DIAG,
} = require('./util');

const markXRange = (gridState, { y1, x1, x2 }) => {
    const { grid } = gridState;
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const x = xRange[i];
        const newVal = grid[x][y1] + 1;

        if (newVal === 2) {
            gridState.intersections += 1;
        }

        grid[x][y1] = newVal;
    }
};

const markYRange = (gridState, { x1, y1, y2 }) => {
    const { grid } = gridState;
    const yRange = range(y1, y2);

    for (let i in yRange) {
        const y = yRange[i];
        const newVal = grid[x1][y] + 1;

        if (newVal === 2) {
            gridState.intersections += 1;
        }

        grid[x1][y] = newVal;
    }
};

const markDiagRange = (gridState, { x1, x2, y1, y2 }) => {
    const { grid } = gridState;
    const xDir = x2 > x1 ? 1 : -1;
    const yDir = y2 > y1 ? 1 : -1;
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const y = y1 + i * yDir;
        const x = x1 + i * xDir;
        const newVal = grid[x][y] + 1;

        if (newVal === 2) {
            gridState.intersections += 1;
        }

        grid[x][y] = newVal;
    }
};

exports.calculateIntersectionGrid = (vectors, calculateDiagonals = false) => {
    const gridState = makeGrid(vectors);

    for (let v in vectors) {
        const vector = vectors[v];
        const vType = vectorType(vector);

        if (vType === IS_X) markYRange(gridState, vector);
        else if (vType === IS_Y) markXRange(gridState, vector);
        else if (calculateDiagonals && vType === IS_DIAG)
            markDiagRange(gridState, vector);
    }

    return gridState.intersections;
};

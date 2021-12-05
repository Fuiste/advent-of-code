const { makeGrid, range, vectorType, IS_X, IS_Y, IS_DIAG } = require('./util');

const markXRange = (grid, { y1, x1, x2 }) => {
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const x = xRange[i];
        grid[x][y1] = grid[x][y1] + 1;
    }
};

const markYRange = (grid, { x1, y1, y2 }) => {
    const yRange = range(y1, y2);

    for (let i in yRange) {
        const y = yRange[i];
        grid[x1][y] = grid[x1][y] + 1;
    }
};

const markDiagRange = (grid, { x1, x2, y1, y2 }) => {
    const xDir = x2 > x1 ? 1 : -1;
    const yDir = y2 > y1 ? 1 : -1;
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const y = y1 + i * yDir;
        const x = x1 + i * xDir;

        grid[x][y] = grid[x][y] + 1;
    }
};

exports.calculateIntersectionGrid = (vectors, calculateDiagonals = false) => {
    const grid = makeGrid(vectors);

    for (let v in vectors) {
        const vector = vectors[v];
        const vType = vectorType(vector);

        if (vType === IS_X) markYRange(grid, vector);
        else if (vType === IS_Y) markXRange(grid, vector);
        else if (calculateDiagonals && vType === IS_DIAG)
            markDiagRange(grid, vector);
    }

    const intersectedArea = grid.reduce((area, row) => {
        for (let i in row) {
            if (row[i] > 1) area += 1;
        }

        return area;
    }, 0);
    return intersectedArea;
};

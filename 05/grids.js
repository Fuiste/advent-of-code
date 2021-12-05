const { makeGrid, range, vectorType, IS_X, IS_Y, IS_DIAG } = require('./util');

const markXRange = (grid, y, x1, x2) => {
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const x = xRange[i];
        grid[x][y] = grid[x][y] + 1;
    }

    return grid;
};

const markYRange = (grid, x, y1, y2) => {
    const yRange = range(y1, y2);

    for (let i in yRange) {
        const y = yRange[i];
        grid[x][y] = grid[x][y] + 1;
    }

    return grid;
};

const markDiagRange = (grid, x1, x2, y1, y2) => {
    const xDir = x2 > x1 ? 1 : -1;
    const yDir = y2 > y1 ? 1 : -1;
    const xRange = range(x1, x2);

    for (let i in xRange) {
        const y = y1 + i * yDir;
        const x = x1 + i * xDir;

        grid[x][y] = grid[x][y] + 1;
    }

    return grid;
};

exports.calculateIntersectionGrid = (vectors, calulateDiagonals = false) => {
    let grid = makeGrid(vectors);

    for (let v in vectors) {
        const vType = vectorType(vectors[v]);
        const { x1, y1, x2, y2 } = vectors[v];

        switch (vType) {
            case IS_X: {
                grid = markYRange(grid, x1, y1, y2);
                break;
            }
            case IS_Y: {
                grid = markXRange(grid, y1, x1, x2);
                break;
            }
            case IS_DIAG: {
                if (calulateDiagonals)
                    grid = markDiagRange(grid, x1, x2, y1, y2);
                break;
            }
        }
    }

    const intersectedArea = grid.reduce((area, row) => {
        for (let i in row) {
            if (row[i] > 1) area += 1;
        }

        return area;
    }, 0);
    return intersectedArea;
};

const fs = require('fs');

const IS_X = 'x';
const IS_Y = 'y';
const IS_DIAG = 'd';

exports.getFileData = (path) => {
    const data = fs.readFileSync(path, 'utf8');

    return data;
};

exports.getVectors = (data) => {
    const lines = data.split('\n');
    const toCoords = (coords) => {
        return coords.split(',').map((coord) => parseInt(coord, 10));
    };
    const vectors = lines.map((line) => {
        const [[x1, y1], [x2, y2]] = line.split(' -> ').map(toCoords);

        return { x1, y1, x2, y2 };
    });

    return vectors;
};

exports.makeGrid = (vectors) => {
    const [maxX, maxY] = vectors.reduce(
        ([maxX, maxY], { x1, x2, y1, y2 }) => {
            const newX = Math.max(maxX, x1, x2);
            const newY = Math.max(maxY, y1, y2);

            return [newX, newY];
        },
        [0, 0]
    );

    return [...Array(maxX + 1).keys()].map(() => {
        return [...Array(maxY + 1).keys()].fill(0);
    });
};

exports.range = (dim1, dim2) => {
    const max = Math.max(dim2, dim1);
    const min = Math.min(dim2, dim1);
    const diff = max - min;

    return [...Array(diff + 1).keys()].map((i) => i + min);
};

exports.IS_X = IS_X;
exports.IS_Y = IS_Y;
exports.IS_DIAG = IS_DIAG;

exports.vectorType = ({ x1, y1, x2, y2 }) => {
    if (x1 === x2) return IS_X;
    if (y1 == y2) return IS_Y;

    const xDiff = Math.abs(x1 - x2);
    const yDiff = Math.abs(y1 - y2);

    if (xDiff === yDiff) return IS_DIAG;
};

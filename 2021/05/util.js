const IS_X = 'x';
const IS_Y = 'y';
const IS_DIAG = 'd';

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

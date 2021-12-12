const FLASH_VALUE = 9;
const RESET_VALUE = 0;
const FLASHED = 'x';

const _forMap = (octopusMap, callback) => {
    for (let row in octopusMap) {
        for (let col in octopusMap[row]) {
            callback([row, col]);
        }
    }
};

const _neighbors = (octopusMap, [x, y]) =>
    [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x + 1, y + 1],
        [x + 1, y],
        [x + 1, y - 1],
        [x, y - 1],
        [x, y + 1],
    ].reduce((acc, [nx, ny]) => {
        if (octopusMap[nx] && octopusMap[nx][ny] !== undefined)
            acc.push([nx, ny].map((i) => parseInt(i, 10)));

        return acc;
    }, []);

const _flashAndIncrementNeighbors = (octopusMap, [x, y], hasFlashed) => {
    if (hasFlashed(x, y)) {
        return;
    }

    const neighbors = _neighbors(octopusMap, [x, y]);

    for (let [nx, ny] of neighbors) {
        octopusMap[nx][ny] += 1;
    }

    for (let [nx, ny] of neighbors) {
        if (octopusMap[nx][ny] > FLASH_VALUE) {
            _flashAndIncrementNeighbors(octopusMap, [nx, ny], hasFlashed);
        }
    }
};

const _resetFlashes = (flashMap, octopusMap) => {
    for (let [row, colIndices] of Object.entries(flashMap)) {
        for (let col of Object.keys(colIndices)) {
            octopusMap[row][col] = RESET_VALUE;
        }
    }
};

const _increaseEnergy = (octopusMap) =>
    _forMap(octopusMap, ([row, col]) => {
        octopusMap[row][col] += 1;
    });

const _runStep = (octopusMap) => {
    _increaseEnergy(octopusMap);

    let newFlashes = 0;
    const flashMap = {};
    const hasFlashed = (x, y) => {
        if (flashMap[x] && flashMap[x][y] === FLASHED) return true;
        else if (flashMap[x]) flashMap[x][y] = FLASHED;
        else flashMap[x] = { [y]: FLASHED };

        newFlashes++;
        return false;
    };

    const flashing = [];
    _forMap(octopusMap, ([row, col]) => {
        if (octopusMap[row][col] > FLASH_VALUE) {
            flashing.push([row, col].map((i) => parseInt(i, 10)));
        }
    });

    for (let coords of flashing) {
        _flashAndIncrementNeighbors(octopusMap, coords, hasFlashed);
    }

    _resetFlashes(flashMap, octopusMap);
    return newFlashes;
};

exports.simulateSteps = (octopusMap, numSteps) => {
    let totalFlashes = 0;

    for (let i = 0; i < numSteps; i++) {
        const newFlashes = _runStep(octopusMap);

        totalFlashes += newFlashes;
    }

    return totalFlashes;
};

exports.firstAllFlash = (octopusMap) => {
    const numOctopi = octopusMap.length * octopusMap[0].length;
    let step = 0;
    let isAllFlash = false;

    while (!isAllFlash) {
        const newFlashes = _runStep(octopusMap);

        if (newFlashes === numOctopi) isAllFlash = true;
        step++;
    }

    return step;
};

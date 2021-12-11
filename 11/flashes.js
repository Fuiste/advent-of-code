const FLASH_VALUE = 9;
const FLASHED = 'x';

const _neighbors = (octopusMap, [x, y]) => {
    return [
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
};

const _flashAndIncrementNeighbors = (
    octopusMap,
    [x, y],
    hasFlashed,
    markFlash
) => {
    if (hasFlashed(x, y)) {
        return;
    }

    markFlash(x, y);
    const neighbors = _neighbors(octopusMap, [x, y]);

    for (let [nx, ny] of neighbors) {
        octopusMap[nx][ny] += 1;
    }

    for (let [nx, ny] of neighbors) {
        if (octopusMap[nx][ny] > FLASH_VALUE && !hasFlashed(nx, ny)) {
            _flashAndIncrementNeighbors(
                octopusMap,
                [nx, ny],
                hasFlashed,
                markFlash
            );
        }
    }
};

const _resetFlashes = (octopusMap) => {
    for (let row in octopusMap) {
        for (let col in octopusMap[row]) {
            if (octopusMap[row][col] > FLASH_VALUE) {
                octopusMap[row][col] = 0;
            }
        }
    }
};

const _increaseEnergy = (octopusMap) => {
    for (let row in octopusMap) {
        for (let col in octopusMap[row]) {
            octopusMap[row][col] += 1;
        }
    }
};

const _runStep = (octopusMap) => {
    _increaseEnergy(octopusMap);

    let newFlashes = 0;
    const flashMap = {};
    const markFlash = (x, y) => {
        if (flashMap[x]) flashMap[x][y] = FLASHED;
        else flashMap[x] = { [y]: FLASHED };

        newFlashes++;
    };
    const hasFlashed = (x, y) => {
        return flashMap[x] && flashMap[x][y] === FLASHED;
    };

    const flashing = [];
    for (let row in octopusMap) {
        for (let col in octopusMap[row]) {
            if (octopusMap[row][col] > FLASH_VALUE) {
                flashing.push([row, col].map((i) => parseInt(i, 10)));
            }
        }
    }

    for (let coords of flashing) {
        _flashAndIncrementNeighbors(octopusMap, coords, hasFlashed, markFlash);
    }

    _resetFlashes(octopusMap);
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

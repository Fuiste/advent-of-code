const MAX_HEIGHT = 9;
const VISITED = 'X';

exports.findLocalMins = (maps, callback = null) => {
    const mins = maps.reduce((acc, map, _rIdx) => {
        const rIdx = parseInt(_rIdx, 10);

        for (let i in map) {
            const cIdx = parseInt(i, 10);
            const height = map[cIdx];

            const neighbors = [
                maps[rIdx - 1] && maps[rIdx - 1][cIdx],
                maps[rIdx + 1] && maps[rIdx + 1][cIdx],
                map[cIdx - 1],
                map[cIdx + 1],
            ].filter((n) => n !== undefined);

            if (Math.min(...neighbors) > height) {
                if (callback) callback(rIdx, cIdx);
                acc.push(height);
            }
        }

        return acc;
    }, []);

    return mins;
};

const _calculateBasinSize = (maps, rIdx, cIdx, visit) => {
    const height = maps[rIdx][cIdx];
    const neighbors = [
        [maps[rIdx - 1] && maps[rIdx - 1][cIdx], [rIdx - 1, cIdx]],
        [maps[rIdx + 1] && maps[rIdx + 1][cIdx], [rIdx + 1, cIdx]],
        [maps[rIdx][cIdx - 1], [rIdx, cIdx - 1]],
        [maps[rIdx][cIdx + 1], [rIdx, cIdx + 1]],
    ];
    const toExplore = neighbors.reduce((visitedSpaces, [cur, [r, c]]) => {
        const isNextHeight = cur >= height;

        if (isNextHeight && cur !== MAX_HEIGHT) {
            const didVisit = visit(r, c);

            if (!didVisit) {
                visitedSpaces.push([cur, [r, c]]);
            }
        }

        return visitedSpaces;
    }, []);

    toExplore.forEach(([_, [r, c]]) => {
        _calculateBasinSize(maps, r, c, visit);
    });
};

exports.calculateBasinSize = (maps, rIdx, cIdx) => {
    let size = 1;
    const explored = {};
    const visit = (r, c) => {
        if (explored[r] && explored[r][c]) {
            return true;
        } else if (explored[r]) {
            explored[r][c] = VISITED;
        } else {
            explored[r] = { [c]: VISITED };
        }

        size++;
        return false;
    };
    _calculateBasinSize(maps, rIdx, cIdx, visit);

    return size;
};

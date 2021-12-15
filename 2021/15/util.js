const { range } = require('../base-util');

exports.getMap = (data) => {
    return data
        .split('\n')
        .map((line) => line.split('').map((c) => parseInt(c, 10)));
};

exports.getFullMap = (map) =>
    range(0, map.length * 5 - 1).map((rIdx) =>
        range(0, map[0].length * 5 - 1).map(
            (cIdx) =>
                ((map[rIdx % map.length][cIdx % map[0].length] +
                    Math.floor(rIdx / map.length) +
                    Math.floor(cIdx / map[0].length) -
                    1) %
                    9) +
                1
        )
    );

exports.START = [0, 0];

exports.getEnd = (map) => [map.length - 1, map[0].length - 1];

exports.getInitialTotalsAndVisited = (map) => {
    const total = [];
    const visited = [];

    for (let i in map) {
        for (let j in map[0]) {
            total[[i, j]] = Infinity;
            visited[[i, j]] = false;
        }
    }

    return [total, visited];
};

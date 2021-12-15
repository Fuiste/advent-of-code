const { START, getEnd, getInitialTotalsAndVisited } = require('./util');

const _neighbors = ([x, y], map) => {
    const neighbours = [];

    if (x > 0) neighbours.push([x - 1, y]);
    if (y > 0) neighbours.push([x, y - 1]);
    if (x + 1 < map.length) neighbours.push([x + 1, y]);
    if (y + 1 < map[0].length) neighbours.push([x, y + 1]);

    return neighbours;
};

const _calculateEndRisk = ([x, y], map, parentLookup) => {
    let endRisk = 0;

    while (parentLookup[[x, y]]) {
        endRisk += map[x][y];
        [x, y] = parentLookup[[x, y]];
    }

    return endRisk;
};

exports.findSmallestRiskPath = (map) => {
    const [endX, endY] = getEnd(map);
    const [totals, visited] = getInitialTotalsAndVisited(map);
    const parentLookup = [];
    let queue = [START];

    visited[START] = true;
    totals[START] = 0;

    while (queue.length) {
        let [curX, curY] = queue[0];

        for (let i of queue) {
            if (totals[i] < totals[[curX, curY]]) [curX, curY] = i;
        }

        queue = queue.filter(([ex, ey]) => ex !== curX || ey !== curY);

        if (curX === endX && curY === endY) {
            return _calculateEndRisk([curX, curY], map, parentLookup);
        } else {
            _neighbors([curX, curY], map).forEach(([neighborX, neighborY]) => {
                if (!visited[[neighborX, neighborY]]) {
                    const maybeLowerCost =
                        map[neighborX][neighborY] + totals[[curX, curY]];

                    if (maybeLowerCost < totals[[neighborX, neighborY]]) {
                        totals[[neighborX, neighborY]] = maybeLowerCost;
                        parentLookup[[neighborX, neighborY]] = [curX, curY];
                    }

                    visited[[neighborX, neighborY]] = true;
                    queue.push([neighborX, neighborY]);
                }
            });
        }
    }

    throw new Error('This should not be possible');
};

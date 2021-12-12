const START = 'start';
const END = 'end';

const _isLargeCave = (caveId) => /^[A-Z]*$/.test(caveId);

const _canRevisit = (caveId) => {
    return !_isLargeCave(caveId) && caveId !== START;
};

const _canVisit = (caveId, visited) => {
    const isLarge = _isLargeCave(caveId);

    return (!isLarge && !visited.has(caveId)) || isLarge;
};

const _visit = ({
    connectionGraph,
    curLocation,
    visited,
    allowSingleRevisit,
}) => {
    const visitedClone = new Set(visited);
    visitedClone.add(curLocation);

    if (curLocation === END) {
        return 1;
    }

    return Array.from(connectionGraph[curLocation]).reduce((acc, caveId) => {
        if (_canVisit(caveId, visited)) {
            return (
                acc +
                _visit({
                    connectionGraph,
                    curLocation: caveId,
                    visited: visitedClone,
                    allowSingleRevisit,
                })
            );
        } else if (_canRevisit(caveId) && allowSingleRevisit) {
            return (
                acc +
                _visit({
                    connectionGraph,
                    curLocation: caveId,
                    visited: visitedClone,
                    allowSingleRevisit: false,
                })
            );
        }

        return acc;
    }, 0);
};

exports.traverseCaves = (connectionGraph, allowSingleRevisit = false) => {
    const visited = new Set();
    visited.add(START);

    return _visit({
        connectionGraph,
        curLocation: START,
        visited,
        allowSingleRevisit,
    });
};

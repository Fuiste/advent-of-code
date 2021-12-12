const START = 'start';
const END = 'end';

const _isLargeCave = (caveId) => /^[A-Z]*$/.test(caveId);

const _canRevisit = (caveId) => !_isLargeCave(caveId) && caveId !== START;

const _canVisit = (caveId, visited) => {
    const isLarge = _isLargeCave(caveId);

    return (!isLarge && !visited.includes(caveId)) || isLarge;
};

const _visit = ({
    connectionGraph,
    curLocation,
    visited,
    allowSingleRevisit,
}) => {
    const visitedClone = !_isLargeCave(curLocation)
        ? [...visited, curLocation]
        : visited;

    if (curLocation === END) return 1;

    return connectionGraph[curLocation].reduce((acc, caveId) => {
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
        } else if (allowSingleRevisit && _canRevisit(caveId)) {
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

exports.traverseCaves = (connectionGraph, allowSingleRevisit = false) =>
    _visit({
        connectionGraph,
        curLocation: START,
        visited: [START],
        allowSingleRevisit,
    });

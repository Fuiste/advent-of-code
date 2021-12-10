const _linearCost = (positionA, positionB) => {
    return Math.abs(positionA - positionB);
};

const _increasingCost = (positionA, positionB) => {
    const dist = _linearCost(positionA, positionB);

    return (dist * (dist + 1)) / 2;
};

const _fuelCostForPosition = (initialPositions, position, fuelFn) => {
    return initialPositions.reduce((total, currentPosition) => {
        if (currentPosition !== position)
            total += fuelFn(currentPosition, position);

        return total;
    }, 0);
};

const _fuelCostForPositions = (initialPositions, increasingCost = false) => {
    return initialPositions.reduce((costMap, position) => {
        if (!costMap[position])
            costMap[position] = _fuelCostForPosition(
                initialPositions,
                position,
                increasingCost ? _increasingCost : _linearCost
            );

        return costMap;
    }, {});
};

exports.findOptimalPosition = (initiaPositions, increasingCost = false) => {
    const costMap = _fuelCostForPositions(initiaPositions, increasingCost);
    const [[optimal, cost]] = Object.entries(costMap).sort(
        ([_a, costA], [_b, costB]) => {
            return costA - costB;
        }
    );

    return [optimal, cost];
};

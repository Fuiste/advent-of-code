exports.getInitialPositions = (data) => {
    return data.split(',').map((d) => parseInt(d, 10));
};

exports.getHeightMap = (data) => {
    const lines = data.split('\n');

    return lines.map((l) => l.split('').map((ch) => parseInt(ch, 10)));
};

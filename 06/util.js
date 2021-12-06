const fs = require('fs');

exports.getFileData = (path) => {
    const data = fs.readFileSync(path, 'utf8');

    return data;
};

exports.getInputs = (data) => {
    return data.split(',').map((it) => parseInt(it, 10));
};

exports.toInputMap = (inputs) => {
    return inputs.reduce((map, input) => {
        if (map[input]) {
            map[input] += 1;
        } else {
            map[input] = 1;
        }

        return map;
    }, {});
};

exports.range = (dim1, dim2) => {
    const max = Math.max(dim2, dim1);
    const min = Math.min(dim2, dim1);
    const diff = max - min;

    return [...Array(diff + 1).keys()].map((i) => i + min);
};

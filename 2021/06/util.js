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

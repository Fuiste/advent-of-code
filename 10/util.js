exports.getCharArrays = (data) => {
    return data.split('\n').map((line) => {
        return line.split('');
    });
};

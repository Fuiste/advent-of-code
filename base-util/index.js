const fs = require('fs');

exports.flow = (...fns) => {
    if (!fns.length) throw new Error('Need at least 1 function to flow()');
    if (fns.length === 1) return fns[0];

    return (args) => {
        const first = fns[0](args);

        return fns.slice(1).reduce((result, fn) => {
            return fn(result);
        }, first);
    };
};

exports.getFileData = (path) => {
    const data = fs.readFileSync(path, 'utf8');

    return data;
};

exports.range = (dim1, dim2) => {
    const max = Math.max(dim2, dim1);
    const min = Math.min(dim2, dim1);
    const diff = max - min;

    return [...Array(diff + 1).keys()].map((i) => i + min);
};

const { getFileData } = require('../base-util');
const { doFold } = require('./fold');
const { getMarksAndFolds, markToString, prettyPrint } = require('./util');
const before = new Date().getTime();

const data = getFileData('input.txt');
const [marks, folds] = getMarksAndFolds(data);

const finalMarks = folds.reduce((acc, fold) => {
    return doFold(acc, fold);
}, marks);

prettyPrint(finalMarks);

const after = new Date().getTime();
console.log(`(${after - before} ms)`);

const { getFileData } = require('../base-util');
const { doFold } = require('./fold');
const { getMarksAndFolds } = require('./util');
const before = new Date().getTime();

const data = getFileData('input.txt');
const [marks, folds] = getMarksAndFolds(data);
const { size: ans } = doFold(marks, folds[0]);

const after = new Date().getTime();
console.log(`Marks after first fold ${ans} (${after - before} ms)`);

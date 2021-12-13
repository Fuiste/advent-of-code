const Y = 'y';

exports.markToString = ([x, y]) => `${x},${y}`;

exports.stringToMark = (s) => s.split(',').map((i) => parseInt(i, 10));

exports.getMarksAndFolds = (data) => {
    const [markLines, foldLines] = data.split('\n\n');
    const rawMarks = markLines.split('\n');
    const marks = new Set();

    for (let m of rawMarks) {
        marks.add(m);
    }

    const folds = foldLines.split('\n').map((line) => {
        const [axis, rawIdx] = line.split(' ')[2].split('=');
        const idx = parseInt(rawIdx, 10);

        if (axis === Y) return [0, idx];
        else return [idx, 0];
    });

    return [marks, folds];
};

exports.prettyPrint = (markSet) => {
    const marks = [...markSet].map(this.stringToMark);
    const display = [...Array(6).fill(' ')].map((_) => [
        ...Array(40).fill(' '),
    ]);

    marks.forEach(([x, y]) => {
        display[y][x] = '0';
    });
    display.forEach((line) => {
        console.log(line.join(''));
    });
};

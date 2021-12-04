const fs = require('fs');

exports.parseBoards = (fileData, boardSize) => {
    const before = new Date().getTime();
    const boardOffset = boardSize + 1;
    const lines = fileData.split(`\n`);

    if (lines.length < 7 || (lines.length - 1) % boardOffset !== 0) {
        throw new Error(`Invalid file length, got ${lines.length}`);
    }

    const [_draws, _newLine, ...boardLines] = lines;
    const toBoardX = (boardLine) => {
        return boardLine
            .split(' ')
            .filter((s) => !!s)
            .map((s) => parseInt(s, 10));
    };

    const boards = boardLines.reduce((boards, curLine, idx) => {
        const idxWithinBoardY = idx % boardOffset;

        if (idxWithinBoardY === 0) {
            boards.push([toBoardX(curLine)]);
        } else if (idxWithinBoardY !== boardOffset - 1) {
            boards[Math.floor(idx / boardOffset)].push(toBoardX(curLine));
        }

        return boards;
    }, []);

    const after = new Date().getTime();
    console.log(`(Calculated boards in ${after - before} ms)`);
    return boards;
};

exports.getFileData = () => {
    const data = fs.readFileSync('./input-2.txt', 'utf8');

    return data;
};

exports.parseDraws = (fileData) => {
    const lines = fileData.split('\n');

    if (!lines.length) {
        throw new Error('Invalid file input');
    }

    return lines[0].split(',').map((s) => parseInt(s, 10));
};

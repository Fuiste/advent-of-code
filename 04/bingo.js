const BOARD_SIZE = 5;
const MARK = 'X';

const applyDraw = (board, marks, draw) => {
    const newMarks = marks.map((markRow, rIdx) => {
        return markRow.map((markEl, cIdx) => {
            return board[rIdx][cIdx] === draw ? MARK : markEl;
        });
    });

    return newMarks;
};

const getMarkBoard = () => {
    return Array.from(Array(BOARD_SIZE)).map(() => {
        return Array.from(Array(BOARD_SIZE)).map(() => null);
    });
};

const isColWinner = (marks) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (marks.every((col) => col[i] === MARK)) {
            return true;
        }
    }

    return false;
};

// const isDiagWinner = (marks) => {
//     const arr = Array.from(Array(BOARD_SIZE));
//     const firstDiagWinner = arr.every((_, idx) => {
//         return marks[idx][idx] === MARK;
//     });
//     const secondDiagWinner = arr.every((_, idx) => {
//         return marks[BOARD_SIZE - 1 - idx][idx] === MARK;
//     });

//     return firstDiagWinner || secondDiagWinner;
// };

const isRowWinner = (marks) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (marks[i].every((it) => it === MARK)) {
            return true;
        }
    }

    return false;
};

const isWinner = (marks) => {
    return isColWinner(marks) || isRowWinner(marks);
};

exports.playableBoard = function* playableBoard(initialBoard) {
    let marks = getMarkBoard();

    while (true) {
        const draw = yield;
        marks = applyDraw(initialBoard, marks, draw);

        if (isWinner(marks)) {
            return { board: initialBoard, marks, draw };
        }
    }
};

exports.MARK = MARK;
exports.BOARD_SIZE = BOARD_SIZE;

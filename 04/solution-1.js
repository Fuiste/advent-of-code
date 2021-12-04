const before = new Date().getTime();
const { parseBoards, parseDraws, getFileData } = require('./util');
const { playableBoard, MARK, BOARD_SIZE } = require('./bingo');

const data = getFileData();
const boards = parseBoards(data, BOARD_SIZE);
const draws = parseDraws(data);

const getWinningBoardsWithDrawAndMarks = () => {
    const playableBoards = boards.map(playableBoard);
    let drawIdx = 0;
    let winners = [];

    while (!winners.length) {
        const results = Array.from(Array(playableBoards.length)).map(
            (_, idx) => {
                return playableBoards[idx].next(draws[drawIdx]);
            }
        );

        for (let i = 0; i < results.length; i++) {
            const { done, value } = results[i];
            if (done) {
                winners.push(value);
            }
        }
        drawIdx++;
    }

    return winners;
};

const calculateScore = ({ board, draw, marks }) => {
    console.log(board);
    console.log(marks);
    console.log(draw);
    const unmarkedNumbers = board.reduce((acc, row, rIdx) => {
        row.forEach((num, cIdx) => {
            if (marks[rIdx][cIdx] !== MARK) {
                acc.push(num);
            }
        });

        return acc;
    }, []);
    console.log(unmarkedNumbers.length);
    const sumUnmarked = unmarkedNumbers.reduce((acc, num) => acc + num, 0);
    const score = sumUnmarked * draw;

    return score;
};

const winningBoards = getWinningBoardsWithDrawAndMarks();
const winningScore = calculateScore(winningBoards[0]);
const after = new Date().getTime();
console.log(`Winning score: ${winningScore} (${after - before} ms)`);

exports.BOARD_SIZE = BOARD_SIZE;

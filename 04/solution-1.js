const {
    calculateScore,
    parseBoards,
    parseDraws,
    getFileData,
} = require('./util');
const { playableBoard, MARK, BOARD_SIZE } = require('./bingo');
const before = new Date().getTime();

const data = getFileData();
const boards = parseBoards(data, BOARD_SIZE);
const draws = parseDraws(data);

const getWinningBoardsWithDrawAndMarks = () => {
    const playableBoards = boards.map(playableBoard);
    let drawIdx = 0;
    let winners = [];

    playableBoards.forEach((board) => board.next());

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

const winningBoards = getWinningBoardsWithDrawAndMarks();
const winningScore = calculateScore(winningBoards[0]);

const after = new Date().getTime();
console.log(`Winning score: ${winningScore} (${after - before} ms)`);

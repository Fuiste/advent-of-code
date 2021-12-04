const before = new Date().getTime();
const {
    calculateScore,
    parseBoards,
    parseDraws,
    getFileData,
} = require('./util');
const { playableBoard, BOARD_SIZE } = require('./bingo');

const data = getFileData();
const boards = parseBoards(data, BOARD_SIZE);
const draws = parseDraws(data);

const getLastWinningBoardWithDrawAndMarks = () => {
    let playableBoards = boards.map(playableBoard);
    let drawIdx = 0;

    playableBoards.forEach((board) => board.next());

    while (playableBoards.length > 1) {
        const results = Array.from(Array(playableBoards.length)).map(
            (_, idx) => {
                return playableBoards[idx].next(draws[drawIdx]);
            }
        );

        playableBoards = playableBoards.filter((_, idx) => {
            return !results[idx].done;
        });
        drawIdx++;
    }

    const lastWinningBoard = playableBoards[0];
    let result = lastWinningBoard.next(draws[drawIdx]);
    while (!result.done) {
        result = lastWinningBoard.next(draws[drawIdx]);
        drawIdx++;
    }

    return result.value;
};

const losingBoard = getLastWinningBoardWithDrawAndMarks();
const losingScore = calculateScore(losingBoard);
const after = new Date().getTime();
console.log(`Losing score: ${losingScore} (${after - before} ms)`);

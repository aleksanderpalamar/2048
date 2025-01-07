import { DIFFICULTY_TIMES } from '../constants.js';
import { createEmptyBoard, findEmptyTiles, hasValidMoves } from '../utils/boardUtils.js';
export class GameModel {
    constructor() {
        this.board = createEmptyBoard();
        this.score = 0;
        this.difficulty = 'easy';
        this.timeLeft = DIFFICULTY_TIMES[this.difficulty];
    }
    initGame() {
        this.board = createEmptyBoard();
        this.addNewTile();
        this.score = 0;
    }
    addNewTile() {
        const emptyTiles = findEmptyTiles(this.board);
        if (emptyTiles.length > 0) {
            const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            this.board[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    updateScore(value) {
        this.score += value;
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    setBoard(newBoard) {
        this.board = newBoard;
    }
    getBoard() {
        return this.board;
    }
    getScore() {
        return this.score;
    }
    getDifficulty() {
        return this.difficulty;
    }
    setTimeLeft(time) {
        this.timeLeft = time;
    }
    getTimeLeft() {
        return this.timeLeft;
    }
    hasValidMoves() {
        return hasValidMoves(this.board);
    }
}

import { createEmptyBoard, findEmptyTiles, hasValidMoves } from '../utils/boardUtils.js';
export class GameModel {
    constructor() {
        this.board = createEmptyBoard();
        this.score = 0;
        this.difficulty = 'easy';
        this.timeLeft = 0;
    }
    initGame() {
        this.board = createEmptyBoard();
        this.score = 0;
        this.addNewTile();
        this.addNewTile();
    }
    addNewTile() {
        const emptyTiles = findEmptyTiles(this.board);
        if (emptyTiles.length > 0) {
            const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            this.board[row][col] = 2;
        }
    }
    updateScore(value) {
        this.score += value;
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
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

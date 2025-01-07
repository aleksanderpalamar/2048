import { GRID_SIZE } from '../constants.js';
export function createEmptyBoard() {
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
}
export function findEmptyTiles(board) {
    const emptyTiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    return emptyTiles;
}
export function hasValidMoves(board) {
    // Check for empty cells
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === 0)
                return true;
        }
    }
    // Check for possible horizontal merges
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (board[row][col] === board[row][col + 1])
                return true;
        }
    }
    // Check for possible vertical merges
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === board[row + 1][col])
                return true;
        }
    }
    return false;
}
export function transposeBoard(board) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

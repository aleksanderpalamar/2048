import { GRID_SIZE } from '../constants.js';
import { transposeBoard } from './boardUtils.js';

export function mergeTiles(row, updateScore) {
    const merged = [];
    let i = 0;
    
    while (i < row.length) {
        if (i + 1 < row.length && row[i] === row[i + 1]) {
            const mergedValue = row[i] * 2;
            merged.push(mergedValue);
            updateScore(mergedValue);
            i += 2;
        } else {
            merged.push(row[i]);
            i++;
        }
    }
    
    return merged;
}

export function moveLeft(currentBoard, updateScore) {
    const newBoard = currentBoard.map(row => {
        const newRow = row.filter(cell => cell !== 0);
        const mergedRow = mergeTiles(newRow, updateScore);
        return mergedRow.concat(Array(GRID_SIZE - mergedRow.length).fill(0));
    });
    return newBoard;
}

export function moveRight(currentBoard, updateScore) {
    const newBoard = currentBoard.map(row => {
        const newRow = row.filter(cell => cell !== 0);
        const reversed = newRow.reverse();
        const mergedRow = mergeTiles(reversed, updateScore);
        const result = Array(GRID_SIZE - mergedRow.length).fill(0).concat(mergedRow.reverse());
        return result;
    });
    return newBoard;
}

export function moveUp(currentBoard, updateScore) {
    const transposed = transposeBoard(currentBoard);
    const moved = moveLeft(transposed, updateScore);
    return transposeBoard(moved);
}

export function moveDown(currentBoard, updateScore) {
    const transposed = transposeBoard(currentBoard);
    const moved = moveRight(transposed, updateScore);
    return transposeBoard(moved);
}
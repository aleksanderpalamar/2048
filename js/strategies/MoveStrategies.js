import { GRID_SIZE } from '../../src/constants.js';
import { transposeBoard } from '../utils/boardUtils.js';
export class LeftMoveStrategy {
    move(board, updateScore) {
        return board.map(row => {
            const newRow = row.filter(cell => cell !== 0);
            const mergedRow = this.mergeTiles(newRow, updateScore);
            return mergedRow.concat(Array(GRID_SIZE - mergedRow.length).fill(0));
        });
    }
    mergeTiles(row, updateScore) {
        const merged = [];
        let i = 0;
        while (i < row.length) {
            if (i + 1 < row.length && row[i] === row[i + 1]) {
                const mergedValue = row[i] * 2;
                merged.push(mergedValue);
                updateScore(mergedValue);
                i += 2;
            }
            else {
                merged.push(row[i]);
                i++;
            }
        }
        return merged;
    }
}
export class RightMoveStrategy {
    move(board, updateScore) {
        return board.map(row => {
            const newRow = row.filter(cell => cell !== 0);
            const reversed = newRow.reverse();
            const mergedRow = this.mergeTiles(reversed, updateScore);
            return Array(GRID_SIZE - mergedRow.length).fill(0).concat(mergedRow.reverse());
        });
    }
    mergeTiles(row, updateScore) {
        const merged = [];
        let i = 0;
        while (i < row.length) {
            if (i + 1 < row.length && row[i] === row[i + 1]) {
                const mergedValue = row[i] * 2;
                merged.push(mergedValue);
                updateScore(mergedValue);
                i += 2;
            }
            else {
                merged.push(row[i]);
                i++;
            }
        }
        return merged;
    }
}
export class UpMoveStrategy {
    move(board, updateScore) {
        const transposed = transposeBoard(board);
        const moved = new LeftMoveStrategy().move(transposed, updateScore);
        return transposeBoard(moved);
    }
}
export class DownMoveStrategy {
    move(board, updateScore) {
        const transposed = transposeBoard(board);
        const moved = new RightMoveStrategy().move(transposed, updateScore);
        return transposeBoard(moved);
    }
}

import { GRID_SIZE } from '../constants.js';

class MoveStrategy {
    // Método base para mover e mesclar tiles
    mergeLine(line, updateScore) {
        // 1. Remover zeros
        const nonZeros = line.filter(cell => cell !== 0);
        
        // 2. Mesclar números iguais adjacentes
        const merged = [];
        for (let i = 0; i < nonZeros.length; i++) {
            if (i < nonZeros.length - 1 && nonZeros[i] === nonZeros[i + 1]) {
                const mergedValue = nonZeros[i] * 2;
                merged.push(mergedValue);
                if (updateScore) {
                    updateScore(mergedValue);
                }
                i++; // Pular o próximo número pois já foi mesclado
            } else {
                merged.push(nonZeros[i]);
            }
        }
        
        // 3. Preencher com zeros até completar o tamanho do grid
        while (merged.length < GRID_SIZE) {
            merged.push(0);
        }
        
        return merged;
    }
}

export class LeftMoveStrategy extends MoveStrategy {
    move(board, updateScore) {
        return board.map(row => this.mergeLine([...row], updateScore));
    }
}

export class RightMoveStrategy extends MoveStrategy {
    move(board, updateScore) {
        return board.map(row => {
            const reversed = [...row].reverse();
            const merged = this.mergeLine(reversed, updateScore);
            return merged.reverse();
        });
    }
}

export class UpMoveStrategy extends MoveStrategy {
    move(board, updateScore) {
        const rotated = this.rotateBoard(board);
        const moved = new LeftMoveStrategy().move(rotated, updateScore);
        return this.rotateBoard(moved, true);
    }

    rotateBoard(board, counterClockwise = false) {
        const size = board.length;
        const rotated = Array(size).fill().map(() => Array(size).fill(0));
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (counterClockwise) {
                    rotated[size - 1 - j][i] = board[i][j];
                } else {
                    rotated[j][size - 1 - i] = board[i][j];
                }
            }
        }
        
        return rotated;
    }
}

export class DownMoveStrategy extends MoveStrategy {
    move(board, updateScore) {
        const rotated = this.rotateBoard(board);
        const moved = new RightMoveStrategy().move(rotated, updateScore);
        return this.rotateBoard(moved, true);
    }

    rotateBoard(board, counterClockwise = false) {
        const size = board.length;
        const rotated = Array(size).fill().map(() => Array(size).fill(0));
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (counterClockwise) {
                    rotated[j][size - 1 - i] = board[i][j];
                } else {
                    rotated[size - 1 - j][i] = board[i][j];
                }
            }
        }
        
        return rotated;
    }
}
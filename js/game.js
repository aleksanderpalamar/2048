const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const startGameButton = document.getElementById('start-game');
const timerElement = document.getElementById('timer');
const timeElement = document.getElementById('time');
const gameOverPopover = document.getElementById('game-over-popover');
const tryAgainButton = document.getElementById('try-again-button');
const congratulationsPopover = document.getElementById('congratulations-popover');
const continueButton = document.getElementById('continue-button');
const noMovesPopover = document.getElementById('no-moves-popover');

let board = [];
let score = 0;
let startX, startY, endX, endY;
let difficulty = 'easy';
let timerInterval;

const DIFFICULTY_TIMES = {
    easy: 30 * 60, // 30 minutes
    medium: 15 * 60, // 15 minutes
    hard: 10 * 60 // 10 minutes
};

let isGameOver = false;

function initGame() {
    board = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    isGameOver = false;
    addNewTile();
    updateBoard();
    resetTimer();
}

function addNewTile() {
    const emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({row: i, col: j});
            }
        }
    }
    if (emptyTiles.length > 0) {
        const {row, col} = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${board[i][j]}`;
            tile.textContent = board[i][j] || '';
            gameBoard.appendChild(tile);
        }
    }
    scoreElement.textContent = score;
}

function move(direction) {
    if (isGameOver) return;
    let moved = false;
    const newBoard = JSON.parse(JSON.stringify(board));

    function pushTiles(row) {
        const filteredRow = row.filter(tile => tile !== 0);
        const missingTiles = 4 - filteredRow.length;
        const zeros = Array(missingTiles).fill(0);
        return direction === 'left' ? [...filteredRow, ...zeros] : [...zeros, ...filteredRow];
    }

    function mergeTiles(row) {
        for (let i = 0; i < 3; i++) {
            if (direction === 'left') {
                if (row[i] === row[i + 1]) {
                    row[i] *= 2;
                    row[i + 1] = 0;
                    score += row[i];
                    moved = true;
                    if (row[i] === 2048) {
                        showCongratulationsPopover();
                    }
                }
            } else {
                if (row[3 - i] === row[2 - i]) {
                    row[3 - i] *= 2;
                    row[2 - i] = 0;
                    score += row[3 - i];
                    moved = true;
                    if (row[3 - i] === 2048) {
                        showCongratulationsPopover();
                    }
                }
            }
        }
        return row;
    }

    for (let i = 0; i < 4; i++) {
        let row = direction === 'up' || direction === 'down'
            ? [newBoard[0][i], newBoard[1][i], newBoard[2][i], newBoard[3][i]]
            : newBoard[i];

        row = pushTiles(row);
        row = mergeTiles(row);
        row = pushTiles(row);

        if (direction === 'up' || direction === 'down') {
            for (let j = 0; j < 4; j++) {
                newBoard[j][i] = row[j];
            }
        } else {
            newBoard[i] = row;
        }
    }

    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
        board = newBoard;
        addNewTile();
        updateBoard();
        if (!canMove()) {
            showNoMovesPopover();
        }
    } else if (!canMove()) {
        showNoMovesPopover();
    }
}

function canMove() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return true;
            }
            if (j < 3 && board[i][j] === board[i][j + 1]) {
                return true;
            }
            if (j < 3 && board[j][i] === board[i][j + 1]) {
                return true;
            }
        }
    }
    return false;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = DIFFICULTY_TIMES[difficulty];
    updateTimerDisplay();
    timerElement.style.display = 'block';
}

function startTimer() {
    if (isGameOver) return;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showGameOverPopover();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showGameOverPopover() {
    gameOverPopover.classList.remove('hidden');
    isGameOver = true;
    clearInterval(timerInterval);
}

function showCongratulationsPopover() {
    congratulationsPopover.classList.remove('hidden');
    clearInterval(timerInterval);
}

function showNoMovesPopover() {
    noMovesPopover.classList.remove('hidden');
    isGameOver = true;
    clearInterval(timerInterval);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

gameBoard.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
});

gameBoard.addEventListener('mouseup', (e) => {
    endX = e.clientX;
    endY = e.clientY;
    handleSwipe();
});

gameBoard.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

gameBoard.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const dx = endX - startX;
    const dy = endY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 50) {
        if (absDx > absDy) {
            move(dx > 0 ? 'right' : 'left');
        } else {
            move(dy > 0 ? 'down' : 'up');
        }
    }
}

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

startGameButton.addEventListener('click', () => {
    initGame();
    startTimer();
});

tryAgainButton.addEventListener('click', () => {
    gameOverPopover.classList.add('hidden');
    isGameOver = false;
    initGame();
});

initGame();
import { GRID_SIZE, DIFFICULTY_TIMES } from '../src/constants.js';
import { createEmptyBoard, findEmptyTiles, hasValidMoves } from '../src/utils/boardUtils.js';
import { moveLeft, moveRight, moveUp, moveDown } from '../src/utils/moveUtils.js';
import { formatTime } from '../src/utils/timerUtils.js';
import { handleSwipeGesture } from '../src/utils/inputUtils.js';

// DOM Elements
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
const tryAgainNoMovesButton = document.getElementById('try-again-no-moves-button');

// Game State
let board = [];
let score = 0;
let startX, startY, endX, endY;
let difficulty = 'easy';
let timerInterval;
let isGameOver = false;
let timeLeft;

// Game Functions
function initGame() {
    board = createEmptyBoard();
    score = 0;
    isGameOver = false;
    addNewTile();
    addNewTile();
    updateBoard();
    resetTimer();
}

function addNewTile() {
    const emptyTiles = findEmptyTiles(board);
    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = 2;
    }
}

function updateBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${board[row][col]}`;
            tile.textContent = board[row][col] || '';
            gameBoard.appendChild(tile);
        }
    }
    scoreElement.textContent = score.toString();
}

function updateScore(value) {
    score += value;
    if (value === 2048) {
        showCongratulationsPopover();
    }
}

function move(direction) {
    if (isGameOver) return;

    const previousBoard = JSON.stringify(board);
    let currentBoard = board.map(row => [...row]);
    
    switch (direction) {
        case 'up':
            currentBoard = moveUp(currentBoard, updateScore);
            break;
        case 'down':
            currentBoard = moveDown(currentBoard, updateScore);
            break;
        case 'left':
            currentBoard = moveLeft(currentBoard, updateScore);
            break;
        case 'right':
            currentBoard = moveRight(currentBoard, updateScore);
            break;
    }

    if (JSON.stringify(currentBoard) !== previousBoard) {
        board = currentBoard;
        addNewTile();
        updateBoard();
        
        if (!hasValidMoves(board)) {
            showNoMovesPopover();
        }
    }
}

// Timer Functions
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
    timeElement.textContent = formatTime(timeLeft);
}

// Popover Functions
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

// Event Listeners
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

function handleSwipe() {
    const direction = handleSwipeGesture(startX, startY, endX, endY);
    if (direction) {
        move(direction);
    }
}

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

// UI Event Listeners
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
    startTimer();
});

continueButton.addEventListener('click', () => {
    congratulationsPopover.classList.add('hidden');
    startTimer();
});

tryAgainNoMovesButton.addEventListener('click', () => {
    noMovesPopover.classList.add('hidden');
    isGameOver = false;
    initGame();
    startTimer();
});

// Initialize the game
initGame();
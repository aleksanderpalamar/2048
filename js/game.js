import { GameController } from './controllers/GameController.js';
import { GameView } from './views/GameView.js';
import { handleSwipeGesture } from './utils/inputUtils.js';
import { DownMoveStrategy, LeftMoveStrategy, RightMoveStrategy, UpMoveStrategy } from './strategies/MoveStrategies.js';

const view = new GameView();
const controller = new GameController(view);

// Event Listeners
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            controller.move(new UpMoveStrategy());
            break;
        case 'ArrowDown':
            controller.move(new DownMoveStrategy());
            break;
        case 'ArrowLeft':
            controller.move(new LeftMoveStrategy());
            break;
        case 'ArrowRight':
            controller.move(new RightMoveStrategy());
            break;
    }
});
const gameBoard = document.getElementById('game-board');
let startX, startY, endX, endY;
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
    const direction = handleSwipeGesture(startX, startY, endX, endY);
    if (direction) {
        switch (direction) {
            case 'up':
                controller.move(new UpMoveStrategy());
                break;
            case 'down':
                controller.move(new DownMoveStrategy());
                break;
            case 'left':
                controller.move(new LeftMoveStrategy());
                break;
            case 'right':
                controller.move(new RightMoveStrategy());
                break;
        }
    }
}
// UI Event Listeners
const difficultySelect = document.getElementById('difficulty');
const startGameButton = document.getElementById('start-game');
const tryAgainButton = document.getElementById('try-again-button');
const continueButton = document.getElementById('continue-button');
const tryAgainNoMovesButton = document.getElementById('try-again-no-moves-button');
difficultySelect.addEventListener('change', (e) => {
    controller.setDifficulty(e.target.value);
});
startGameButton.addEventListener('click', () => {
    controller.initGame();
    controller.startTimer();
});
tryAgainButton.addEventListener('click', () => {
    view.hideAllPopover();
    controller.initGame();
    controller.startTimer();
});
continueButton.addEventListener('click', () => {
    view.hideAllPopover();
    controller.startTimer();
});
tryAgainNoMovesButton.addEventListener('click', () => {
    view.hideAllPopover();
    controller.initGame();
    controller.startTimer();
});
// Initialize the game
controller.initGame();

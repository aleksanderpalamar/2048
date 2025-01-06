import { DIFFICULTY_TIMES } from "../../src/constants.js";
import { GameModel } from "../models/GameModel.js";
export class GameController {
    constructor(view) {
        this.game = new GameModel();
        this.view = view;
        this.timerInterval = null;
        this.isGameOver = false;
    }
    initGame() {
        this.game.initGame();
        this.isGameOver = false;
        this.view.updateBoard(this.game.getBoard());
        this.view.updateScore(this.game.getScore());
        this.resetTimer();
    }
    move(strategy) {
        if (this.isGameOver)
            return;
        const previousBoard = JSON.stringify(this.game.getBoard());
        const newBoard = strategy.move(this.game.getBoard(), (value) => this.game.updateScore(value));
        if (JSON.stringify(newBoard) !== previousBoard) {
            this.game.addNewTile();
            this.view.updateBoard(this.game.getBoard());
            this.view.updateScore(this.game.getScore());
            if (!this.game.hasValidMoves()) {
                this.view.showNoMovesPopover();
                this.endGame();
            }
        }
    }
    setDifficulty(difficulty) {
        this.game.setDifficulty(difficulty);
    }
    resetTimer() {
        clearInterval(this.timerInterval);
        this.game.setTimeLeft(DIFFICULTY_TIMES[this.game.getDifficulty()]);
        this.view.updateTimerDisplay(this.game.getTimeLeft());
    }
    startTimer() {
        if (this.isGameOver)
            return;
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const timeLeft = this.game.getTimeLeft() - 1;
            this.game.setTimeLeft(timeLeft);
            this.view.updateTimerDisplay(timeLeft);
            if (timeLeft <= 0) {
                this.endGame();
                this.view.showGameOverPopover();
            }
        }, 1000);
    }
    endGame() {
        this.isGameOver = true;
        clearInterval(this.timerInterval);
    }
}

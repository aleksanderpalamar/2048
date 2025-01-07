import { DIFFICULTY_TIMES } from "../constants.js";
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
    if (this.isGameOver) return;

    const previousBoard = JSON.stringify(this.game.getBoard());
    const newBoard = strategy.move(this.game.getBoard(), (value) =>
      this.game.updateScore(value)
    );

    // Atualizar o tabuleiro apenas se houve mudança
    if (JSON.stringify(newBoard) !== previousBoard) {
      this.game.setBoard(newBoard);
      this.game.addNewTile();
      this.view.updateBoard(this.game.getBoard());
      this.view.updateScore(this.game.getScore());

      if (this.checkFor2048Tile(newBoard)) {
        this.view.showCongratulationPopover();
        this.endGame();
      } else if (!this.game.hasValidMoves()) {
        this.view.showNoMovesPopover();
        this.endGame();
      }
    }
  }

  checkFor2048Tile(board) {
    return board.some(row => row.some(cell => cell === 2048));
  }

  setDifficulty(difficulty) {
    this.game.setDifficulty(difficulty);
    this.resetTimer();
  }
  resetTimer() {
    clearInterval(this.timerInterval);
    this.game.setTimeLeft(DIFFICULTY_TIMES[this.game.getDifficulty()]);
    this.view.updateTimerDisplay(this.game.getTimeLeft());
  }
  startTimer() {
    if (this.isGameOver) return;
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

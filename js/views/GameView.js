import { formatTime } from "../utils/timerUtils.js";
export class GameView {
  constructor() {
    this.gameBoard = document.getElementById("game-board");
    this.scoreElement = document.getElementById("score");
    this.timerElement = document.getElementById("timer");
    this.gameOverPopover = document.getElementById("game-over-popover");
    this.congratulationsPopover = document.getElementById(
      "congratulations-popover"
    );
    this.noMovesPopover = document.getElementById("no-moves-popover");
  }
  updateBoard(board) {
    this.gameBoard.innerHTML = "";
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const tile = document.createElement("div");
        tile.className = `tile tile-${board[row][col]}`;
        tile.textContent = board[row][col].toString() || "";
        this.gameBoard.appendChild(tile);
      }
    }
  }
  updateScore(score) {
    this.scoreElement.textContent = score.toString();
  }
  updateTimerDisplay(timeLeft) {
    this.timerElement.textContent = formatTime(timeLeft);
  }
  showGameOverPopover() {
    this.gameOverPopover.classList.add("hidden");
  }
  showCongratulationsPopover() {
    this.congratulationsPopover.classList.remove("hidden");
  }
  showNoMovesPopover() {
    this.noMovesPopover.classList.remove("hidden");
  }
  hideAllPopover() {
    this.gameOverPopover.classList.add("hidden");
    this.congratulationsPopover.classList.add("hidden");
    this.noMovesPopover.classList.add("hidden");
  }
}

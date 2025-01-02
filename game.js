const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
let board = [];
let score = 0;
let startX, startY, endX, endY;

function initGame() {
    board = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    addNewTile();
    addNewTile();
    updateBoard();
}

function resetGame() {
    initGame();
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
                }
            } else {
                if (row[3 - i] === row[2 - i]) {
                    row[3 - i] *= 2;
                    row[2 - i] = 0;
                    score += row[3 - i];
                    moved = true;
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
    }
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

gameBoard.addEventListener('mousedown', (event) => {
    startX = event.clientX;
    startY = event.clientY;
});

gameBoard.addEventListener('mouseup', (event) => {
  endX = event.clientX;
  endY = event.clientY;
  handleSwipe();
});

gameBoard.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

gameBoard.addEventListener('touchend', (event) => {
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  const dx = endX - startX;
  const dy = endY - startY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx > absDy) {
    move(dx > 0 ? 'right' : 'left');
  } else {
    move(dy > 0 ? 'down' : 'up');
  }
}

initGame();
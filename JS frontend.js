let board, currentPlayer, moves;

function initGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    moves = 0;
    updateBoard();
    updateStatus();
    setMessage('Make a move');
}

function updateBoard() {
    const boardDiv = document.getElementById('board');
    let html = '';
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let cellContent = board[r][c];
            let cellClass = 'cell';
            if (cellContent) cellClass += ' disabled';
            html += `<div class="${cellClass}" data-row="${r}" data-col="${c}">${cellContent}</div>`;
        }
    }
    boardDiv.innerHTML = html;
    document.querySelectorAll('.cell').forEach(cell => {
        if (!cell.textContent) cell.addEventListener('click', onCellClick);
    });
}

function updateStatus() {
    document.getElementById('turnDisplay').innerText = currentPlayer;
    document.getElementById('movesCount').innerText = moves;
}

function setMessage(text) {
    document.getElementById('message').innerText = text;
}

function onCellClick(e) {
    const row = +e.target.getAttribute('data-row');
    const col = +e.target.getAttribute('data-col');
    if (board[row][col]) return;
    board[row][col] = currentPlayer;
    moves++;
    if (checkWinner(row, col)) {
        updateBoard();
        setMessage(`Player ${currentPlayer} wins!`);
        endGame();
        return;
    }
    if (moves === 9) {
        updateBoard();
        setMessage('Draw!');
        endGame();
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateBoard();
    updateStatus();
}

function checkWinner(row, col) {
    // Check current row, column, and diagonals
    const symbol = board[row][col];
    // Row
    if (board[row].every(cell => cell === symbol)) return true;
    // Column
    if ([0,1,2].every(r => board[r][col] === symbol)) return true;
    // Diagonal
    if (row === col && [0,1,2].every(i => board[i][i] === symbol)) return true;
    if (row + col === 2 && [0,1,2].every(i => board[i][2-i] === symbol)) return true;
    return false;
}

function endGame() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', onCellClick);
        cell.classList.add('disabled');
    });
}

document.getElementById('playBtn').addEventListener('click', initGame);

window.onload = initGame;


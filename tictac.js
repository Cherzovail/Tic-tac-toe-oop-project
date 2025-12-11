// Game state
let scores = { X: 0, O: 0 };
let currentBoard = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let gameActive = true;
let offlineMode = false; 
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let player1Char = 'default';
let player2Char = 'default';
let bgMusicPlaying = false;

// Customization state
let customization = {
    xAvatar: 'avatar1',
    oAvatar: 'avatar1'
};
// API endpoint
const API_URL = './Backend/api.php';
/*Sound effect functions*/
function playCoinSound() {
    const coinSound = document.getElementById('coinSound');
    if (coinSound) {
        coinSound.currentTime = 0;
        coinSound.play().catch(err => console.log('Coin sound play blocked:', err));
    }
}

function playGameOverSound() {
    const gameOverSound = document.getElementById('gameOverSound');
    if (gameOverSound) {
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(err => console.log('Game over sound play blocked:', err));
    }
}

function playStageWinSound() {
    const stageWinSound = document.getElementById('stageWinSound');
    if (stageWinSound) {
        stageWinSound.currentTime = 0;
        stageWinSound.play().catch(err => console.log('Stage win sound play blocked:', err));
    }
}

function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && !bgMusicPlaying) {
        bgMusic.volume = 0.3; 
        bgMusic.play().catch(err => console.log('Background music play blocked:', err));
        bgMusicPlaying = true;
    }
}

function stopBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.pause();
        bgMusicPlaying = false;
    }
}

window.onload = function() {
    loadCustomization();
    renderBoard(currentBoard);
    loadScores();
    updateScoresUI();
    initializeCustomizeModal();
    initializeOptionsMenu();
    initializePlayerSetupModal();
    initializeWinModal();
    initializeDrawModal();
    initializeRestartButton();
    // Show options menu on load
    showOptionsMenu();
    // Probe backend availability and switch to offline mode if unreachable
    probeBackend().then(online => {
        if (!online) {
            offlineMode = true;
            document.getElementById('message').textContent = 'Offline mode: playing locally';
        } else {
            // fetch current server state
            getGameState();
        }
    });
    // Close avatar dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const xAvatarSelector = document.getElementById('xAvatarSelector');
        const oAvatarSelector = document.getElementById('oAvatarSelector');
        const player1AvatarSelector = document.getElementById('player1AvatarSelector');
        const player2AvatarSelector = document.getElementById('player2AvatarSelector');
        
        if (!xAvatarSelector?.contains(event.target)) {
            document.getElementById('xAvatarDropdown')?.classList.add('hidden');
        }
        if (!oAvatarSelector?.contains(event.target)) {
            document.getElementById('oAvatarDropdown')?.classList.add('hidden');
        }
        if (!player1AvatarSelector?.contains(event.target)) {
            document.getElementById('player1AvatarDropdown')?.classList.add('hidden');
        }
        if (!player2AvatarSelector?.contains(event.target)) {
            document.getElementById('player2AvatarDropdown')?.classList.add('hidden');
        }
    });
};
/*Show options menu*/
function showOptionsMenu() {
    const optionsModal = document.getElementById('optionsModal');
    if (optionsModal) {
        optionsModal.classList.add('open');
    }
}
/*Hide options menu*/
function hideOptionsMenu() {
    const optionsModal = document.getElementById('optionsModal');
    if (optionsModal) {
        optionsModal.classList.remove('open');
    }
}

/*Show player setup modal*/
function showPlayerSetupModal() {
    const playerSetupModal = document.getElementById('playerSetupModal');
    if (playerSetupModal) {
        playerSetupModal.classList.add('open');
    }
}
/*Hide player setup modal*/
function hidePlayerSetupModal() {
    const playerSetupModal = document.getElementById('playerSetupModal');
    if (playerSetupModal) {
        playerSetupModal.classList.remove('open');
    }
}
/*Show win modal*/
function showWinModal(winner) {
    const winModal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    const playerName = winner === 'X' ? player1Name : player2Name;
    
    if (winMessage) {
        winMessage.textContent = `${playerName} Wins!`;
    }
    if (winModal) {
        winModal.classList.add('open');
    }
}
/*Hide win modal*/
function hideWinModal() {
    const winModal = document.getElementById('winModal');
    if (winModal) {
        winModal.classList.remove('open');
    }
}
/*Show draw modal*/
function showDrawModal() {
    const drawModal = document.getElementById('drawModal');
    if (drawModal) {
        drawModal.classList.add('open');
    }
}
/*Hide draw modal*/
function hideDrawModal() {
    const drawModal = document.getElementById('drawModal');
    if (drawModal) {
        drawModal.classList.remove('open');
    }
}
/*options menu events*/
function initializeOptionsMenu() {
    const optionsPlayBtn = document.getElementById('optionsPlayBtn');
    const optionsSettingsBtn = document.getElementById('optionsSettingsBtn');
    const optionsExitBtn = document.getElementById('optionsExitBtn');
    const playBtn = document.getElementById('playBtn');
    
    if (optionsPlayBtn) {
        optionsPlayBtn.addEventListener('click', function() {
            hideOptionsMenu();
            showPlayerSetupModal();
        });
    }
    
    if (optionsSettingsBtn) {
        optionsSettingsBtn.addEventListener('click', function() {
            hideOptionsMenu();
            const customModal = document.getElementById('customModal');
            if (customModal) {
                customModal.classList.add('open');
            }
        });
    }
    
    if (optionsExitBtn) {
        optionsExitBtn.addEventListener('click', function() {
            alert('Thank you for playing Tic Tac Toe!');
        });
    }

    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            hideOptionsMenu();
            showPlayerSetupModal();
        });
    }
}

function initializePlayerSetupModal() {
    const startGameBtn = document.getElementById('startGameBtn');
    const cancelGameBtn = document.getElementById('cancelGameBtn');
    const closePlayerSetup = document.getElementById('closePlayerSetup');
    const player1NameInput = document.getElementById('player1NameInput');
    const player2NameInput = document.getElementById('player2NameInput');
    // Player 1 avatar picker
    const player1AvatarSelector = document.getElementById('player1AvatarSelector');
    const player1AvatarSelected = document.getElementById('player1AvatarSelected');
    const player1AvatarDropdown = document.getElementById('player1AvatarDropdown');
    const player1AvatarSelect = document.getElementById('player1AvatarSelect');
    // Player 2 avatar picker
    const player2AvatarSelector = document.getElementById('player2AvatarSelector');
    const player2AvatarSelected = document.getElementById('player2AvatarSelected');
    const player2AvatarDropdown = document.getElementById('player2AvatarDropdown');
    const player2AvatarSelect = document.getElementById('player2AvatarSelect');
    
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            player1Name = player1NameInput.value || 'Player 1';
            player2Name = player2NameInput.value || 'Player 2';
            
            customization.xAvatar = player1AvatarSelect.value || 'avatar1';
            customization.oAvatar = player2AvatarSelect.value || 'avatar1';
            
            syncPlayerSetupToCustomize();

            hidePlayerSetupModal();
            playBackgroundMusic();
            resetGame();
        });
    }
    // Toggle Player 1 Avatar dropdown
    if (player1AvatarSelected) {
        player1AvatarSelected.addEventListener('click', function() {
            player2AvatarDropdown.classList.add('hidden');
            player1AvatarDropdown.classList.toggle('hidden');
        });
    }
    // Toggle Player 2 Avatar dropdown
    if (player2AvatarSelected) {
        player2AvatarSelected.addEventListener('click', function() {
            player1AvatarDropdown.classList.add('hidden');
            player2AvatarDropdown.classList.toggle('hidden');
        });
    }
    // Player 1 Avatar option selection
    if (player1AvatarDropdown) {
        player1AvatarDropdown.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', function() {
                const avatar = this.getAttribute('data-avatar');
                player1AvatarSelect.value = avatar;
                customization.xAvatar = avatar;
                player1AvatarDropdown.classList.add('hidden');
                updatePlayerAvatarPickerUI();
            });
        });
    }
    // Player 2 Avatar option selection
    if (player2AvatarDropdown) {
        player2AvatarDropdown.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', function() {
                const avatar = this.getAttribute('data-avatar');
                player2AvatarSelect.value = avatar;
                customization.oAvatar = avatar;
                player2AvatarDropdown.classList.add('hidden');
                updatePlayerAvatarPickerUI();
            });
        });
    }
    
    if (cancelGameBtn) {
        cancelGameBtn.addEventListener('click', function() {
            hidePlayerSetupModal();
            showOptionsMenu();
        });
    }
    
    if (closePlayerSetup) {
        closePlayerSetup.addEventListener('click', function() {
            hidePlayerSetupModal();
            showOptionsMenu();
        });
    }
}
/*Initialize win modal events*/
function initializeWinModal() {
    const winRestartBtn = document.getElementById('winRestartBtn');
    const winMenuBtn = document.getElementById('winMenuBtn');
    
    if (winRestartBtn) {
        winRestartBtn.addEventListener('click', function() {
            hideWinModal();
            resetGame();
        });
    }
    
    if (winMenuBtn) {
        winMenuBtn.addEventListener('click', function() {
            hideWinModal();
            stopBackgroundMusic();
            showOptionsMenu();
        });
    }
}
/*Initialize draw modal events*/
function initializeDrawModal() {
    const drawRestartBtn = document.getElementById('drawRestartBtn');
    const drawMenuBtn = document.getElementById('drawMenuBtn');
    
    if (drawRestartBtn) {
        drawRestartBtn.addEventListener('click', function() {
            hideDrawModal();
            resetGame();
        });
    }
    
    if (drawMenuBtn) {
        drawMenuBtn.addEventListener('click', function() {
            hideDrawModal();
            stopBackgroundMusic();
            showOptionsMenu();
        });
    }
}
/*Initialize restart button*/
function initializeRestartButton() {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            hideWinModal();
            resetGame();
        });
    }
}
/*Render the board grid with cells*/
function renderBoard(board) {
    let html = '';
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cellValue = board[r][c];
            let displayValue = '';
            
            if (cellValue === 'X') {
                const ext = customization.xAvatar === 'avatar4' ? '.jpg' : '.png';
                displayValue = `<img src="avatars/${customization.xAvatar}${ext}" class="cell-avatar" alt="X">`;
            } else if (cellValue === 'O') {
                const ext = customization.oAvatar === 'avatar4' ? '.jpg' : '.png';
                displayValue = `<img src="avatars/${customization.oAvatar}${ext}" class="cell-avatar" alt="O">`;
            }
            
            html += `<div class="cell" data-row="${r}" data-col="${c}" data-value="${cellValue}">${displayValue}</div>`;
        }
    }
    document.getElementById('game-board').innerHTML = html;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.onclick = handleCellClick;
    });
}
/*Handle cell click - send to backend API*/
function handleCellClick(event) {
    if (!gameActive) return;
    
    playCoinSound();
    
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));
    const index = row * 3 + col;
    
    if (offlineMode) {
        localHandleMove(index);
        return;
    }

    const formData = new FormData();
    formData.append('action', 'move');
    formData.append('index', index);

    fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentBoard = data.board;
            renderBoard(currentBoard);
            
            // Update turn display
            if (data.win) {
                document.getElementById('message').textContent = `${data.winner === 'X' ? player1Name : player2Name} wins!`;
                document.getElementById('turnDisplay').textContent = data.winner;
                scores = data.scores;
                updateScoresUI();
                gameActive = false;
                highlightWinningCells(data.board, data.winner);
                playStageWinSound();
                showWinModal(data.winner);
                showRestartButton();
            } else if (data.draw) {
                document.getElementById('message').textContent = 'Draw!';
                document.getElementById('turnDisplay').textContent = '-';
                gameActive = false;
                playGameOverSound();
                showDrawModal();
                showRestartButton();
            } else {
                currentPlayer = data.currentPlayer;
                document.getElementById('turnDisplay').textContent = currentPlayer;
                document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
            }
            let moveCount = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (data.board[i][j] !== '') moveCount++;
                }
            }
            document.getElementById('movesCount').textContent = moveCount;
        } else {
            document.getElementById('message').textContent = data.message || 'Invalid move';
        }
    })
    .catch(err => {
        console.error('Error:', err);
        offlineMode = true;
        document.getElementById('message').textContent = 'Server unreachable — switched to offline mode';
        localHandleMove(index);
    });
}
function localHandleMove(index) {
    const r = Math.floor(index / 3), c = index % 3;
    if (currentBoard[r][c] !== '' || !gameActive) return;
    currentBoard[r][c] = currentPlayer;
    renderBoard(currentBoard);

    const winner = checkWinLocal(currentBoard);
    if (winner) {
        document.getElementById('message').textContent = `${winner === 'X' ? player1Name : player2Name} wins!`;
        scores[winner] = (scores[winner] || 0) + 1;
        updateScoresUI();
        gameActive = false;
        highlightWinningCells(currentBoard, winner);
        playStageWinSound();
        showWinModal(winner);
        showRestartButton();
        return;
    }
    // draw
    let filled = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (currentBoard[i][j] !== '') filled++;
    if (filled === 9) {
        document.getElementById('message').textContent = 'Draw!';
        document.getElementById('turnDisplay').textContent = '-';
        gameActive = false;
        playGameOverSound();
        showDrawModal();
        showRestartButton();
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turnDisplay').textContent = currentPlayer;
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('movesCount').textContent = filled;
}

function checkWinLocal(board) {
    const lines = [
        [[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]
    ];
    for (const line of lines) {
        const [a,b,c] = line;
        const va = board[a[0]][a[1]];
        if (va && va === board[b[0]][b[1]] && va === board[c[0]][c[1]]) return va;
    }
    return null;
}
function updateBoardUI(boardData) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      cells[index].textContent = boardData[row][col];
    }
  }
}
function highlightWinningCells(board, winner) {
    const WIN_LINES = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ];
    
    for (const line of WIN_LINES) {
        const [pos1, pos2, pos3] = line;
        if (board[pos1[0]][pos1[1]] === winner &&
            board[pos2[0]][pos2[1]] === winner &&
            board[pos3[0]][pos3[1]] === winner) {
            
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, idx) => {
                const r = Math.floor(idx / 3);
                const c = idx % 3;
                if ((r === pos1[0] && c === pos1[1]) ||
                    (r === pos2[0] && c === pos2[1]) ||
                    (r === pos3[0] && c === pos3[1])) {
                    cell.style.background = '#fffbeb';
                    cell.style.fontWeight = 'bold';
                }
            });
            break;
        }
    }
}
function updateScoresUI() {
    document.getElementById('scoreX').textContent = scores.X || 0;
    document.getElementById('scoreO').textContent = scores.O || 0;
    
    const playerXAvatar = document.getElementById('playerXAvatar');
    const playerOAvatar = document.getElementById('playerOAvatar');
    
    if (playerXAvatar) {
        const ext = customization.xAvatar === 'avatar4' ? '.jpg' : '.png';
        playerXAvatar.src = `avatars/${customization.xAvatar}${ext}`;
    }
    if (playerOAvatar) {
        const ext = customization.oAvatar === 'avatar4' ? '.jpg' : '.png';
        playerOAvatar.src = `avatars/${customization.oAvatar}${ext}`;
    }
    
    localStorage.setItem('tictac_scores', JSON.stringify(scores));
}
function loadScores() {
    try {
        const raw = localStorage.getItem('tictac_scores');
        if (raw) scores = JSON.parse(raw);
    } catch (e) {
        console.error('Error loading scores:', e);
    }
}
/*Reset game*/
function resetGame() {
    hideRestartButton();
    const formData = new FormData();
    formData.append('action', 'reset');
    
    fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentBoard = data.board;
            currentPlayer = data.currentPlayer;
            scores = data.scores;
            gameActive = true;
            
            renderBoard(currentBoard);
            updateScoresUI();
            document.getElementById('turnDisplay').textContent = currentPlayer;
            document.getElementById('message').textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
            document.getElementById('movesCount').textContent = '0';
            document.querySelectorAll('.cell').forEach(cell => {
                cell.style.background = '';
                cell.style.fontWeight = '';
            });
        }
    })
    .catch(err => {
        console.error('Error resetting game:', err);
        currentBoard = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayer = 'X';
        gameActive = true;
        renderBoard(currentBoard);
        updateScoresUI();
        document.getElementById('turnDisplay').textContent = 'X';
        document.getElementById('message').textContent = `${player1Name}'s turn`;
        document.getElementById('movesCount').textContent = '0';
    });
}
/*Show restart button*/
function showRestartButton() {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.classList.add('show');
    }
}
/*Hide restart button*/
function hideRestartButton() {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.classList.remove('show');
    }
}
/*Get current game state from backend*/
function getGameState() {
    const formData = new FormData();
    formData.append('action', 'getState');
    
    fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentBoard = data.board;
            currentPlayer = data.currentPlayer;
            scores = data.scores;
            renderBoard(currentBoard);
            updateScoresUI();
            document.getElementById('turnDisplay').textContent = currentPlayer;
        }
    })
    .catch(err => {
        console.error('Error fetching game state:', err);
    });
}
function loadCustomization() {
    try {
        const raw = localStorage.getItem('tictac_customization');
        if (raw) {
            customization = { ...customization, ...JSON.parse(raw) };
            applyCustomization();
        }
    } catch (e) {
        console.error('Error loading customization:', e);
    }
}
function saveCustomization() {
    localStorage.setItem('tictac_customization', JSON.stringify(customization));
    applyCustomization();
}
function applyCustomization() {
    renderBoard(currentBoard);
    updateScoresUI();
}
function syncPlayerSetupToCustomize() {
    const player1CharSelect = document.getElementById('player1CharSelect');
    const player2CharSelect = document.getElementById('player2CharSelect');
    const xAvatarSelect = document.getElementById('xAvatarSelect');
    const oAvatarSelect = document.getElementById('oAvatarSelect');

    if (!player1CharSelect || !player2CharSelect) return;
    
    const mapCharToAvatar = (char) => {
        switch ((char || '').toLowerCase()) {
            case 'mario': return 'avatar1';
            case 'luigi': return 'avatar2';
            case 'peach': return 'avatar3';
            case 'daisy': return 'avatar4';
            default: return 'avatar1';
        }
    };

    const newX = mapCharToAvatar(player1CharSelect.value || player1Char);
    const newO = mapCharToAvatar(player2CharSelect.value || player2Char);

    customization.xAvatar = newX;
    customization.oAvatar = newO;
    
    if (xAvatarSelect) xAvatarSelect.value = customization.xAvatar;
    if (oAvatarSelect) oAvatarSelect.value = customization.oAvatar;
    updateAvatarPickerUI();
    saveCustomization();
    applyCustomization();
}
function initializeCustomizeModal() {
    const customBtn = document.getElementById('customBtn');
    const customModal = document.getElementById('customModal');
    const closeCustom = document.getElementById('closeCustom');
    const saveCustom = document.getElementById('saveCustom');
    const resetCustom = document.getElementById('resetCustom');
    
    const xAvatarSelect = document.getElementById('xAvatarSelect');
    const oAvatarSelect = document.getElementById('oAvatarSelect');
    
    const xAvatarSelector = document.getElementById('xAvatarSelector');
    const oAvatarSelector = document.getElementById('oAvatarSelector');
    const xAvatarSelected = document.getElementById('xAvatarSelected');
    const oAvatarSelected = document.getElementById('oAvatarSelected');
    const xAvatarDropdown = document.getElementById('xAvatarDropdown');
    const oAvatarDropdown = document.getElementById('oAvatarDropdown');
    // Open modal
    if (customBtn) {
        customBtn.addEventListener('click', function() {
            customModal.classList.add('open');
            updateAvatarPickerUI();
        });
    }
    // Close modal
    if (closeCustom) {
        closeCustom.addEventListener('click', function() {
            customModal.classList.remove('open');
            closeAvatarDropdowns();
        });
    }
    // Toggle X Avatar dropdown
    if (xAvatarSelected) {
        xAvatarSelected.addEventListener('click', function() {
            oAvatarDropdown.classList.add('hidden');
            xAvatarDropdown.classList.toggle('hidden');
        });
    }
    // Toggle O Avatar dropdown
    if (oAvatarSelected) {
        oAvatarSelected.addEventListener('click', function() {
            xAvatarDropdown.classList.add('hidden');
            oAvatarDropdown.classList.toggle('hidden');
        });
    }
    // X Avatar option selection
    if (xAvatarDropdown) {
        xAvatarDropdown.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', function() {
                const avatar = this.getAttribute('data-avatar');
                customization.xAvatar = avatar;
                xAvatarSelect.value = avatar;
                xAvatarDropdown.classList.add('hidden');
                updateAvatarPickerUI();
            });
        });
    }
    // O Avatar option selection
    if (oAvatarDropdown) {
        oAvatarDropdown.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', function() {
                const avatar = this.getAttribute('data-avatar');
                customization.oAvatar = avatar;
                oAvatarSelect.value = avatar;
                oAvatarDropdown.classList.add('hidden');
                updateAvatarPickerUI();
            });
        });
    }
    // Save customization
    if (saveCustom) {
        saveCustom.addEventListener('click', function() {
            saveCustomization();
            applyCustomization();
            customModal.classList.remove('open');
            closeAvatarDropdowns();
            document.getElementById('message').textContent = 'Customization saved!';
            setTimeout(() => {
                document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
            }, 1500);
        });
    }
    // Reset customization
    if (resetCustom) {
        resetCustom.addEventListener('click', function() {
            customization = {
                xAvatar: 'avatar1',
                oAvatar: 'avatar1'
            };
            saveCustomization();
            applyCustomization();
            customModal.classList.remove('open');
            closeAvatarDropdowns();
            updateAvatarPickerUI();
            document.getElementById('message').textContent = 'Settings reset to default!';
            setTimeout(() => {
                document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
            }, 1500);
        });
    }
}
function updatePlayerAvatarPickerUI() {
    const player1AvatarSelected = document.getElementById('player1AvatarSelected');
    const player2AvatarSelected = document.getElementById('player2AvatarSelected');
    const player1AvatarDropdown = document.getElementById('player1AvatarDropdown');
    const player2AvatarDropdown = document.getElementById('player2AvatarDropdown');
    const player1AvatarSelect = document.getElementById('player1AvatarSelect');
    const player2AvatarSelect = document.getElementById('player2AvatarSelect');
    // Update Player 1 avatar display
    if (player1AvatarSelected) {
        const ext = player1AvatarSelect.value === 'avatar4' ? '.jpg' : '.png';
        player1AvatarSelected.innerHTML = `
            <img src="avatars/${player1AvatarSelect.value}${ext}" alt="Selected" class="selected-avatar-img">
            <span>${capitalizeAvatar(player1AvatarSelect.value)}</span>
        `;
    }
    // Update Player 2 avatar display
    if (player2AvatarSelected) {
        const ext = player2AvatarSelect.value === 'avatar4' ? '.jpg' : '.png';
        player2AvatarSelected.innerHTML = `
            <img src="avatars/${player2AvatarSelect.value}${ext}" alt="Selected" class="selected-avatar-img">
            <span>${capitalizeAvatar(player2AvatarSelect.value)}</span>
        `;
    }
    // Update selected state in Player 1 dropdown
    if (player1AvatarDropdown) {
        player1AvatarDropdown.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.getAttribute('data-avatar') === player1AvatarSelect.value) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
    // Update selected state in Player 2 dropdown
    if (player2AvatarDropdown) {
        player2AvatarDropdown.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.getAttribute('data-avatar') === player2AvatarSelect.value) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
}
/*Update avatar picker UI to show selected avatars (customize modal)*/
function updateAvatarPickerUI() {
    const xAvatarSelected = document.getElementById('xAvatarSelected');
    const oAvatarSelected = document.getElementById('oAvatarSelected');
    const xAvatarDropdown = document.getElementById('xAvatarDropdown');
    const oAvatarDropdown = document.getElementById('oAvatarDropdown');
    // Update X avatar display
    if (xAvatarSelected) {
        const ext = customization.xAvatar === 'avatar4' ? '.jpg' : '.png';
        xAvatarSelected.innerHTML = `
            <img src="avatars/${customization.xAvatar}${ext}" alt="Selected" class="selected-avatar-img">
            <span>${capitalizeAvatar(customization.xAvatar)}</span>
        `;
    }
    // Update O avatar display
    if (oAvatarSelected) {
        const ext = customization.oAvatar === 'avatar4' ? '.jpg' : '.png';
        oAvatarSelected.innerHTML = `
            <img src="avatars/${customization.oAvatar}${ext}" alt="Selected" class="selected-avatar-img">
            <span>${capitalizeAvatar(customization.oAvatar)}</span>
        `;
    }
    // Update selected state in dropdowns
    if (xAvatarDropdown) {
        xAvatarDropdown.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.getAttribute('data-avatar') === customization.xAvatar) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
    
    if (oAvatarDropdown) {
        oAvatarDropdown.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.getAttribute('data-avatar') === customization.oAvatar) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }
}
/*Close all avatar dropdowns*/
function closeAvatarDropdowns() {
    const xAvatarDropdown = document.getElementById('xAvatarDropdown');
    const oAvatarDropdown = document.getElementById('oAvatarDropdown');
    if (xAvatarDropdown) xAvatarDropdown.classList.add('hidden');
    if (oAvatarDropdown) oAvatarDropdown.classList.add('hidden');
}
/*Capitalize avatar name for display*/
function capitalizeAvatar(avatarId) {
    const num = avatarId.replace('avatar', '');
    return `Avatar ${num}`;
}
// Probe backend helper function
async function probeBackend() {
    try {
        const res = await fetch(API_URL, { method: 'POST', body: new FormData() });
        return res.ok;
    } catch (e) {
        return false;
    }
}


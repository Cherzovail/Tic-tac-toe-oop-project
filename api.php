<?php
header('Content-Type: application/json');

require_once 'Board.php';
require_once 'Player.php';
require_once 'Game.php';

session_start();

// Initialize game session if needed
if (!isset($_SESSION['game'])) {
    $_SESSION['game'] = new Game();
    $_SESSION['scores'] = ['X' => 0, 'O' => 0];
}

$game = $_SESSION['game'];
$action = $_POST['action'] ?? $_GET['action'] ?? '';

$response = ['success' => false, 'message' => ''];

if ($action === 'move') {
    // Process a move from frontend
    $index = intval($_POST['index'] ?? -1);
    
    if ($index < 0 || $index > 8) {
        $response['message'] = 'Invalid cell index';
        echo json_encode($response);
        exit;
    }
    
    // Convert 1D index to 2D board coords
    $row = intval($index / 3);
    $col = $index % 3;
    
    $result = $game->playMove($row, $col);
    
    if ($result === null) {
        $response['message'] = 'Cell already occupied';
        echo json_encode($response);
        exit;
    }
    
    if (is_array($result) && isset($result['win']) && $result['win']) {
        $symbol = $result['symbol'] ?? 'X';
        if (!isset($_SESSION['scores'][$symbol])) {
            $_SESSION['scores'][$symbol] = 0;
        }
        $_SESSION['scores'][$symbol]++;
        $response['success'] = true;
        $response['win'] = true;
        $response['winner'] = $symbol;
        $response['scores'] = $_SESSION['scores'];
    } else {
        $response['success'] = true;
        $response['win'] = false;
        $response['currentPlayer'] = $game->getCurrentPlayer()->getSymbol();
    }
    
    // Check for draw
    $boardCells = $game->getBoard();
    $moves = 0;
    if (is_array($boardCells)) {
        foreach ($boardCells as $row_data) {
            if (is_array($row_data)) {
                foreach ($row_data as $cell) {
                    if ($cell !== '') $moves++;
                }
            }
        }
    }
    
    if ($moves === 9 && !$result['win']) {
        $response['draw'] = true;
    }
    
    $response['board'] = $boardCells;
    
} elseif ($action === 'reset') {
    // Reset game board
    $_SESSION['game'] = new Game();
    $game = $_SESSION['game'];
    $response['success'] = true;
    $response['board'] = $game->getBoard();
    $response['scores'] = $_SESSION['scores'];
    $response['currentPlayer'] = $game->getCurrentPlayer()->getSymbol();
    $response['message'] = 'Game reset';
    
} elseif ($action === 'getState') {
    // Get current game state
    $response['success'] = true;
    $response['board'] = $game->getBoard();
    $response['scores'] = $_SESSION['scores'];
    $response['currentPlayer'] = $game->getCurrentPlayer()->getSymbol();
    
} else {
    $response['message'] = 'Unknown action';
}

echo json_encode($response);
?>

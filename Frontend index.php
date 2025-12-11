<?php
require_once 'Game.php';
session_start();
if (!isset($_SESSION['game'])) {
    $_SESSION['game'] = new Game();
}
$game = $_SESSION['game'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $row = $_POST['row'];
    $col = $_POST['col'];
    $result = $game->playMove($row, $col);
    echo json_encode(['board' => $game->getBoard(), 'result' => $result]);
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Tic-Tac-Toe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Classic Tic-Tac-Toe</h1>
    <div id="game-board">
    </div>
    <script src="script.js"></script>
</body>
</html>

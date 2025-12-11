<?php
/*Main entry point for Tic Tac Toe web app
 *Serves the HTML and coordinates PHP backend*/
session_start();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tic Tac Toe</title>
  <link rel="stylesheet" href="frontend.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Tic Tac Toe</h1>
      <div class="controls">
        <button id="playBtn">PLAY</button>
        <button id="scoreBtn" class="secondary">SCORE</button>
      </div>
    </header>

    <div class="top-row">
      <div class="muted">Turn: <strong id="turnDisplay">X</strong></div>
      <div class="muted">Moves: <span id="movesCount">0</span>/9</div>
    </div>

    <div class="board" id="board">
    </div>

    <div class="status">
      <div class="scores" id="scoresPanel">
        <div class="score-card">X: <strong id="scoreX">0</strong></div>
        <div class="score-card">O: <strong id="scoreO">0</strong></div>
      </div>
      <div class="muted" id="message">Make a move</div>
    </div>
  </div>

  <script src="tictac.js"></script>
</body>
</html>

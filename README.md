# Tic-tac-toe-oop-project
TIC TAC TOE (Mario Theme)
-Project Overview
The classic variant of Tic-Tac-Toe is now presented in a "Super Mario"
theme, featuring Mario, Luigi, Princess Peach, and Princess Daisy as the game
markers, instead of the traditional ‘X’ and ‘O’symbols. Despite this fun character
customization, the game entirely retains the signature simplicity and underlying
strategic appeal of the original two-player gameplay.

The principal objective for both players is to be the first to achieve a
complete alignment of three of their identical character symbols in a continuous
straight line. A winning line can be formed in any direction, horizontally across
a row, vertically down a column, or diagonally from one corner space to the
opposite. The game is immediately over once a player successfully creates this
sequence, and that player is declared the winner.

However, if all nine squares are filled before either player manages to
create a line of three, the game results in a draw. Since Tic-Tac-Toe is a solved
game, perfect play from both sides will always lead to a draw, making the
strategic goal to either force a win by exploiting an opponent's mistake or to
ensure at least a tie.

Gameplay in Tic-Tac-Toe is conducted through a sequence of strict,
alternating turns. The process begins with Player 1 (the person who chose their
character first) selecting one of the nine currently empty cells and placing their
chosen character symbol into it. Immediately following this action, the turn shifts
to Player 2.

Turns continue to alternate in this fashion, with every move guided by two
key objectives for the active player. First, to successfully place a mark that
completes a line of three of their own symbols, and second, to defensively block
any immediate threat posed by the opponent who is only one mark away from
victory. It is an absolute rule that a player may only place their mark into a cell
that is currently unoccupied.

-Technology Stack
The technologies we used, are HTML, CSS, JAVASCRIPT, and PHP

├── index.php              # Main entry point (PHP)
├── Tictac.html           # HTML structure (standalone)
├── tictac.js             # JavaScript (frontend logic & API calls)
├── frontend.css          # CSS styles
└── Backend/
    ├── api.php           # API endpoint for game logic
    ├── Game.php          # Game controller class
    ├── Board.php         # Board logic class
    └── Player.php        # Player class

1. **Frontend (HTML/CSS/JS)**
   - `Tictac.html` or `index.php` displays the UI
   - `tictac.js` handles user interactions and communicates with backend via AJAX
   - `frontend.css` styles the board and controls

2. **Backend (PHP)**
   - `Backend/api.php` is the REST endpoint that processes all game logic
   - `Board.php` manages the 3×3 grid and win detection
   - `Game.php` controls turn flow and move validation
   - `Player.php` represents X and O players


-Team members and Contribution
Charles Andrei Cioco     # Coder
Roselle Ballescas        # Documentation/Program Coder
Edgardo Joseph Gonzaga   # Code Tester
Alyza Bianca Crisostomo  # Documentation

-How to play
Tic-Tac-Toe is conducted through a sequence of strict,
alternating turns. The process begins with Player 1 (the person who chose their
character first) selecting one of the nine currently empty cells and placing their
chosen character symbol into it. Immediately following this action, the turn shifts
to Player 2.
Turns continue to alternate in this fashion, with every move guided by two
key objectives for the active player. First, to successfully place a mark that
completes a line of three of their own symbols, and second, to defensively block
any immediate threat posed by the opponent who is only one mark away from
victory. It is an absolute rule that a player may only place their mark into a cell
that is currently unoccupied.

-How to run the program
*Installation instructions*
-Make sure you have PHP installed (download windows php and add it to your PATH)
-Open terminal/Powershell window and navigate to he project folder
-Start the PHP built-in server (php -S localhost:8000) -this will serve the project locally
-Play the game in your Web Browser (open your web browser and go to *http://localhost:8000/Frontend/index.php* or *http://localhost:8000/Frontend/Tictac.html*

To Play it with your Friends (LAN/Network)
-Ensure all computers are connected to the same local network
-Start the PHP server on one machine
-On other devices, open browser and enter http://SERVER_IP:8000/Frontend/index.php (replace SERVER_IP with the real local IP).

Custom Avatars & Sounds
-Put your avatars in Frontend/avatars, use the customization menu in the game to pick new ones.
-Sound effects are in Frontend/sounds.



<?php
require_once 'Board.php';
require_once 'Player.php';

/**
 * Class Game
 * Controls flow between board, players, moves, and win/loss
 */
class Game {
    private $board;
    private $players;
    private $currentTurn;

    public function __construct() {
        $this->board = new Board();
        $this->players = [new Player('X'), new Player('O')];
        $this->currentTurn = 0; // Player 0: 'X', Player 1: 'O'
    }

    public function getCurrentPlayer() {
        return $this->players[$this->currentTurn];
    }

    public function playMove($row, $col) {
        if ($this->board->isCellEmpty($row, $col)) {
            $this->board->setCell($row, $col, $this->getCurrentPlayer()->getSymbol());
            if ($this->board->checkWin($this->getCurrentPlayer()->getSymbol())) {
                return ['win' => true, 'symbol' => $this->getCurrentPlayer()->getSymbol()];
            }
            $this->currentTurn = 1 - $this->currentTurn; // switch turn
            return ['win' => false];
        }
        return null;
    }

    public function getBoard() {
        return $this->board->getCells();
    }
}
?>

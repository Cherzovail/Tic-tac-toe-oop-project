<?php
class Board {
    private $cells;

    public function __construct() {
        $this->cells = array_fill(0, 3, array_fill(0, 3, ''));
    }

    public function getCells() {
        return $this->cells;
    }

    public function setCell($row, $col, $symbol) {
        if ($row >= 0 && $row < 3 && $col >= 0 && $col < 3) {
            $this->cells[$row][$col] = $symbol;
        }
    }

    public function isCellEmpty($row, $col) {
        if ($row >= 0 && $row < 3 && $col >= 0 && $col < 3) {
            return $this->cells[$row][$col] === '';
        }
        return false;
    }

    public function checkWin($symbol) {
        for ($i = 0; $i < 3; $i++) {
            if ($this->cells[$i][0] == $symbol && $this->cells[$i][1] == $symbol && $this->cells[$i][2] == $symbol) return true;
            if ($this->cells[0][$i] == $symbol && $this->cells[1][$i] == $symbol && $this->cells[2][$i] == $symbol) return true;
        }
        if ($this->cells[0][0] == $symbol && $this->cells[1][1] == $symbol && $this->cells[2][2] == $symbol) return true;
        if ($this->cells[0][2] == $symbol && $this->cells[1][1] == $symbol && $this->cells[2][0] == $symbol) return true;
        return false;
    }

    public function isBoardFull() {
        for ($i = 0; $i < 3; $i++) {
            for ($j = 0; $j < 3; $j++) {
                if ($this->cells[$i][$j] === '') {
                    return false;
                }
            }
        }
        return true;
    }
}
?>



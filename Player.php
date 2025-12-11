<?php
/**
 * Class Player
 * Represents a game player
 */
class Player {
    protected $symbol;

    public function __construct($symbol) {
        $this->symbol = $symbol;
    }

    public function getSymbol() {
        return $this->symbol;
    }
}
?>

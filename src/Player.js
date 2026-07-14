import Gameboard from "./Gameboard.js";
import { getRandomMove, getSmartMove } from "./ai.js";

export default class Player {

    constructor(type) {

        this.type = type;

        this.gameboard = new Gameboard();

        this.moves = [];

        this.successfulHits = [];

    }


    getRandomMove() {
        return getRandomMove(this);
    }


    getSmartMove() {
        return getSmartMove(this);
    }


    clearHits() {

        this.successfulHits = [];

    }

}
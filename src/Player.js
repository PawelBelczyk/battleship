import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }


    getRandomMove() {
        return [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
        ];
    }
}


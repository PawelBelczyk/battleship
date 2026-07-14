import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.moves = [];
        this.successfulHits = [];
    }


    getRandomMove() {
        let move;

        do {
            move = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ];

        } while (
            this.moves.some(
                ([row, col]) =>
                    row === move[0] &&
                    col === move[1]
            )
        );

        this.moves.push(move);

        return move;
    }


    getSmartMove() {

        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];


        while (this.successfulHits.length > 0) {

            const lastHit =
                this.successfulHits[this.successfulHits.length - 1];


            const possibleMoves = directions.map(
                ([row, col]) => [
                    lastHit[0] + row,
                    lastHit[1] + col
                ]
            );


            const validMoves = possibleMoves.filter(
                ([row, col]) =>
                    row >= 0 &&
                    row < 10 &&
                    col >= 0 &&
                    col < 10 &&
                    !this.moves.some(
                        ([r, c]) =>
                            r === row &&
                            c === col
                    )
            );


            if (validMoves.length > 0) {

                const move =
                    validMoves[
                        Math.floor(
                            Math.random() * validMoves.length
                        )
                    ];

                this.moves.push(move);

                return move;
            }


            this.successfulHits.pop();
        }


        return this.getRandomMove();
    }
}
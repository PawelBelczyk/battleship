import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.moves = [];
        this.successfulHits = [];
        this.hitDirection = null;
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

        const direction =  this.getHitDirection();

          if (direction) {

              const hits = this.successfulHits;

              const sortedHits = [...hits].sort(
                  (a,b) =>
                      direction === "horizontal"
                      ? a[1] - b[1]
                      : a[0] - b[0]
              );


              const first = sortedHits[0];
              const last = sortedHits[sortedHits.length - 1];


              const targets =
                  direction === "horizontal"
                  ? [
                      [first[0], first[1]-1],
                      [last[0], last[1]+1]
                    ]
                  : [
                      [first[0]-1, first[1]],
                      [last[0]+1, last[1]]
                    ];


              const validTargets = targets.filter(
                  ([row,col]) =>
                      row >= 0 &&
                      row < 10 &&
                      col >= 0 &&
                      col < 10 &&
                      !this.moves.some(
                          ([r,c]) =>
                              r === row &&
                              c === col
                      )
              );


              if(validTargets.length > 0) {

                  const move =
                      validTargets[
                          Math.floor(
                              Math.random() *
                              validTargets.length
                          )
                      ];

                  this.moves.push(move);

                  return move;
              }

          }

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

    clearHits() {
    this.successfulHits = [];
    this.hitDirection = null;
  }

        getHitDirection() {

          if (this.successfulHits.length < 2) {
              return null;
          }


          const first = this.successfulHits[0];
          const second = this.successfulHits[1];


          if (first[0] === second[0]) {
              return "horizontal";
          }


          if (first[1] === second[1]) {
              return "vertical";
          }


          return null;
      }
}
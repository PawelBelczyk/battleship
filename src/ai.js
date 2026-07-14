export function getRandomMove(player) {

    let move;

    do {

        move = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        ];

    } while (
        player.moves.some(
            ([row, col]) =>
                row === move[0] &&
                col === move[1]
        )
    );


    player.moves.push(move);

    return move;
}



export function getHitDirection(player) {

    if (player.successfulHits.length < 2) {
        return null;
    }


    const first = player.successfulHits[0];
    const second = player.successfulHits[1];


    if (first[0] === second[0]) {
        return "horizontal";
    }


    if (first[1] === second[1]) {
        return "vertical";
    }


    return null;
}



export function getSmartMove(player) {


    const direction = getHitDirection(player);



    if(direction) {

        const hits = player.successfulHits;


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
            ?
            [
                [first[0], first[1]-1],
                [last[0], last[1]+1]
            ]
            :
            [
                [first[0]-1, first[1]],
                [last[0]+1, last[1]]
            ];



        const validTargets = targets.filter(
            ([row,col]) =>
                row >= 0 &&
                row < 10 &&
                col >= 0 &&
                col < 10 &&
                !player.moves.some(
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


            player.moves.push(move);

            return move;
        }

    }



    const directions = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];



    while(player.successfulHits.length > 0) {


        const lastHit =
            player.successfulHits[
                player.successfulHits.length - 1
            ];



        const possibleMoves =
            directions.map(
                ([row,col]) => [
                    lastHit[0] + row,
                    lastHit[1] + col
                ]
            );



        const validMoves =
            possibleMoves.filter(
                ([row,col]) =>
                    row >=0 &&
                    row <10 &&
                    col >=0 &&
                    col <10 &&
                    !player.moves.some(
                        ([r,c]) =>
                            r === row &&
                            c === col
                    )
            );



        if(validMoves.length > 0) {

            const move =
                validMoves[
                    Math.floor(
                        Math.random() *
                        validMoves.length
                    )
                ];


            player.moves.push(move);

            return move;
        }


        player.successfulHits.pop();

    }



    return getRandomMove(player);
}
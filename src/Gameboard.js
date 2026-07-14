export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.hitAttacks = [];
    }


    placeShip(ship, coordinates) {
        this.ships.push({
            ship,
            coordinates,
        });
    }


    receiveAttack(coordinates) {
        for (const placedShip of this.ships) {
            const hit = placedShip.coordinates.some(
                ([row, col]) => 
                    row === coordinates[0] && col === coordinates[1]
            );
            if (hit) {
                placedShip.ship.hit();
                this.hitAttacks.push(coordinates);
                return;
            }
        }


        this.missedAttacks.push(coordinates);
    }


        allShipsSunk() {
    return this.ships.every((placedShip) =>
        placedShip.ship.isSunk()
    );
    }

}


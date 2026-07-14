export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
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
                return;
            }
        }


        this.missedAttacks.push(coordinates);
    }

}


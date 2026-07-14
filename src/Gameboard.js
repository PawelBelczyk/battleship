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

    hasAlreadyBeenAttacked(coordinates) {
        const hit = this.hitAttacks.some(
            ([row, col]) =>
                row === coordinates[0] &&
                col === coordinates[1]
        );

        const miss = this.missedAttacks.some(
            ([row, col]) =>
                row === coordinates[0] &&
                col === coordinates[1]
        );

        return hit || miss;
    }

    receiveAttack(coordinates) {
        if (this.hasAlreadyBeenAttacked(coordinates)) {
            return false;
        }

        for (const placedShip of this.ships) {
            const hit = placedShip.coordinates.some(
                ([row, col]) =>
                    row === coordinates[0] &&
                    col === coordinates[1]
            );

            if (hit) {
                placedShip.ship.hit();
                this.hitAttacks.push(coordinates);
                return "hit";
            }
        }

        this.missedAttacks.push(coordinates);
        return "miss";
    }

    allShipsSunk() {
        return this.ships.every((placedShip) =>
            placedShip.ship.isSunk()
        );
    }
}
export default class Gameboard {
    constructor() {
        this.ships = [];
    }


    placeShip(ship, coordinates) {
        this.ships.push({
            ship,
            coordinates,
        });
    }


}


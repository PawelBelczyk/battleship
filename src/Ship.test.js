import {test, expect} from "@jest/globals";
import Ship from "./Ship.js";


test("creates a ship with the correct length and 0 hits", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
});

test("hit() increases the number of hits", () => {
    const ship = new Ship(3);

    ship.hit();

    expect(ship.hits).toBe(1);
});


test("isSunk() returns false when the ship is not sunk", ()=> {
    const ship = new Ship(3);

    ship.hit();

    expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns true when the ship is sunk", () => {
    const ship = new Ship(4);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});



import {test, expect} from "@jest/globals";
import Ship from "./Ship.js";


test("creates a ship with the correct length and 0 hits", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
});
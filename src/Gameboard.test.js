import {test, expect} from "@jest/globals";
import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

test("creates an empty gameboard", () => {
    const board = new Gameboard();

    expect(board.ships).toEqual([]);
});


test("places a ship on the board", () => {
    const board = new Gameboard();
    const ship = new Ship(3);



    board.placeShip(ship, [[0,0],[0,1],[0,2]]);


    expect(board.ships).toEqual([ 
        { 
        
        ship: ship,
        coordinates:   [[0,0],[0,1],[0,2]]
         }
        ]);
    });
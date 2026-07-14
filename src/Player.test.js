import {test, expect} from "@jest/globals";
import Player from "./Player.js";
import Gameboard from "./Gameboard.js";

test("creates a player with a gameboard",() => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});

    

test("creates a human player", () => {
    const player = new Player("human");
    expect(player.type).toBe("human");
});
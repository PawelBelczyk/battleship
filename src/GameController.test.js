import { test, expect } from "@jest/globals";
import GameController from "./GameController.js";


test("creates a new game with two players", () => {

    const game = new GameController();


    expect(game.player).toBeDefined();

    expect(game.computer).toBeDefined();

});

test("player attack hits computer board", () => {

    const game = new GameController();


    const result =
        game.playerAttack([0,0]);


    expect([
        "hit",
        "miss"
    ])
    .toContain(result);

});

test("computer can make a move", () => {

    const game = new GameController();


    const before =
        game.player.gameboard.hitAttacks.length +
        game.player.gameboard.missedAttacks.length;


    game.computerTurn();


    const after =
        game.player.gameboard.hitAttacks.length +
        game.player.gameboard.missedAttacks.length;


    expect(after).toBe(before + 1);

});
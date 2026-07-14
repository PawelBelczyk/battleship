import { test, expect } from "@jest/globals";
import Player from "./Player.js";
import { getRandomMove, getSmartMove } from "./ai.js";


test("AI generates valid random move", () => {

    const computer = new Player("computer");


    const move = getRandomMove(computer);


    expect(move).toHaveLength(2);

    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);

    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(10);

});



test("AI does not repeat moves", () => {

    const computer = new Player("computer");


    const firstMove = getRandomMove(computer);
    const secondMove = getRandomMove(computer);


    expect(secondMove).not.toEqual(firstMove);

});



test("AI attacks next to a successful hit", () => {

    const computer = new Player("computer");


    computer.successfulHits.push([5,5]);


    const move = getSmartMove(computer);


    expect([
        [4,5],
        [6,5],
        [5,4],
        [5,6]
    ])
    .toContainEqual(move);

});



test("AI continues direction after two hits", () => {

    const computer = new Player("computer");


    computer.successfulHits.push(
        [5,5],
        [5,6]
    );


    const move = getSmartMove(computer);


    expect([
        [5,4],
        [5,7]
    ])
    .toContainEqual(move);

});
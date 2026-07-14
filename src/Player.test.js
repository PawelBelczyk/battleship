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

test("creates a computer player",() => {
    const computer = new Player("computer");

    expect(computer.type).toBe("computer");
})


test("computer generates attack coordinates",() => {
    const computer = new Player("computer");
        const move = computer.getRandomMove();
        expect(move.length).toBe(2);
    
});

test("computer does not repeat moves", () => {

  const computer = new Player("computer");

  const moves = [];

  for(let i = 0; i < 100; i++) {
    moves.push(
      computer.getRandomMove()
    );
  }


  const uniqueMoves = new Set(
    moves.map(move => move.toString())
  );


  expect(uniqueMoves.size)
    .toBe(100);

});

test("computer does not repeat moves", () => {
    const player = new Player("computer");

    const move1 = player.getRandomMove();
    const move2 = player.getRandomMove();

    expect(move1).not.toEqual(move2);
});

test("smart move attacks next to successful hit", () => {

    const player = new Player("computer");

    player.successfulHits.push([5,5]);

    const move = player.getSmartMove();

    expect([
        [4,5],
        [6,5],
        [5,4],
        [5,6]
    ]).toContainEqual(move);

});

test("player has its own gameboard", () => {
    const player = new Player("human");

    expect(player.gameboard).toBeDefined();
});
import { Table } from "./Table.js";
import { Player } from "./Player.js";

import { Deck } from "./Deck.js";

class Game {
  constructor({ player, table }) {
    this.player = player;
    this.dealer = new Player("Krupier");
    this.table = table;
    this.deck = new Deck();

    this.deck.shuffle();
  }
  run() {
    this.dealCards();
  }
  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayerCard(card1.render());

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealerCard(card2.render());
    }
  }
}
const table = new Table(
  document.querySelector(".playerCards"),
  document.querySelector(".dealerCards")
);
const player = new Player("raf");

const game = new Game({
  player,
  table,
});
game.run();

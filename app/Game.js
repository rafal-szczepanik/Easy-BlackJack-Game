import { Table } from "./Table.js";
import { Player } from "./Player.js";
import { Deck } from "./Deck.js";
import { Message } from "./Message.js";

class Game {
  constructor({
    player,
    table,
    hitButton,
    stayButton,
    playerPoints,
    dealerPoints,
    messageBox,
  }) {
    this.hitButton = hitButton;
    this.stayButton = stayButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.messageBox = messageBox;
    this.player = player;
    this.dealer = new Player("Krupier");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener("click", (event) => this.hitCard());
    this.stayButton.addEventListener("click", (event) => this.dealerPlays());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayerCard(card.render());
    this.playerPoints.innerHTML = this.player.calculatePoints();
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
    this.playerPoints.innerHTML = this.player.calculatePoints();
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }
  dealerPlays() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealerCard(card.render());
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }
    this.endGame();
  }
  endGame() {
    this.hitButton.removeEventListener("click", (event) => this.hitCard);
    this.stayButton.removeEventListener("click", (event) => this.dealerPlays);

    this.hitButton.style.display = "none";
    this.stayButton.style.display = "none";

    if (this.player.points < 21 && this.player.points === this.dealer.points) {
      this.messageBox.setText("Remis".show());

      return;
    } else if (this.player.points > 21) {
      this.messageBox.setText("Wygrywa Dealer").show();

      return;
    } else if (this.dealer.points > 21) {
      this.messageBox.setText("Wygrywa Player").show();

      return;
    } else if (this.player.points < this.dealer.points) {
      this.messageBox.setText("Wygrywa Dealer").show();

      return;
    }
  }
}

const table = new Table(
  document.querySelector(".playerCards"),
  document.querySelector(".dealerCards")
);
const messageBox = new Message(document.querySelector(".message"));

const player = new Player("raf");

const game = new Game({
  hitButton: document.querySelector(".nextCard"),
  stayButton: document.querySelector(".stand"),
  playerPoints: document.querySelector(".playerPoints"),
  dealerPoints: document.querySelector(".enemyPoints"),
  player,
  table,
  messageBox,
});
game.run();

export interface Card {
  value: string;
  suit: string;
}

export enum CardType {
  Player,
  Dealer,
  Hidden,
}

export interface PickedCard extends Card {
  hidden: boolean;
}

export enum StatusMessage {
  PlayerWins = "You Win, Dealer Lose",
  DealerWins = "Dealer Wins, You Lose",
  Tie = "The game resulted in a Tie!",
  GameOver = "Game Over.",
}

export enum GameState {
  Init,
  PlayerHand,
  DealerHand,
  GameOver,
}

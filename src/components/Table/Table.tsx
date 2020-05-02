import React from "react";
import { PickedCard, Card, GameState } from "../../types";
import Message from "../Message/Message";

interface TableProps {
  statusMessage: string;
  deck: Card[];
  playerCount: number;
  playerCards: PickedCard[];
  dealerCards: PickedCard[];
  dealerCount: number;
  gameState: GameState;
  hit: Function;
  stand: Function;
  reset: Function;
}

const Table = (props: TableProps) => {
  const {
    statusMessage,
    deck,
    playerCount,
    playerCards,
    dealerCards,
    dealerCount,
    gameState,
    hit,
    stand,
    reset,
  } = props;
  return (
    <div>
      <Message>{statusMessage}</Message>
      <h3>Cards in the deck: {deck.length} </h3>
      <div>
        <h3>Player Cards ({playerCount})</h3>
        <ul>
          {playerCards.length > 0 &&
            playerCards.map((card: PickedCard) => (
              <li>
                {card.value} - {card.suit}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3>Dealer Cards ({dealerCount})</h3>
        <ul>
          {dealerCards.length > 0 &&
            dealerCards.map((card: PickedCard) => {
              if (card.hidden) {
                return <li>Hidden Card</li>;
              } else {
                return (
                  <li>
                    {card.value} - {card.suit}
                  </li>
                );
              }
            })}
        </ul>
      </div>
      <div>
        <button
          disabled={
            (gameState === GameState.GameOver ||
              gameState === GameState.DealerHand) &&
            true
          }
          onClick={() => hit()}
        >
          Hit
        </button>
        <button
          disabled={
            (gameState === GameState.GameOver ||
              gameState === GameState.DealerHand) &&
            true
          }
          onClick={() => stand()}
        >
          Stand
        </button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
};

export default Table;

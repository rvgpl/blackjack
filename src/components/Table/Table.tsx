import React from "react";
import { PickedCard, Card, GameState } from "../../types";
import Message from "../Message/Message";
import Header from "../Header/Header";
import Hand from "../Hand/Hand";
import Actions from "../Actions/Actions";

import "./Table.css";

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
    <div className="table">
      <Header />
      <Message>{statusMessage}</Message>
      {/* <h3>Cards in the deck: {deck.length} </h3> */}
      <p>Dealer</p>
      <Hand count={dealerCount} cards={dealerCards} />
      <p>Player</p>
      <Hand count={playerCount} cards={playerCards} />

      <Actions hit={hit} stand={stand} reset={reset} gameState={gameState} />
    </div>
  );
};

export default Table;

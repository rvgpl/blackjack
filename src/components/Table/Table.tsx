import React from "react";
import { PickedCard, GameState, HandType } from "../../types";
import Message from "../Message/Message";
import Header from "../Header/Header";
import Hand from "../Hand/Hand";
import Actions from "../Actions/Actions";

import "./Table.css";

interface TableProps {
  statusMessage: string;
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
      <main className="table-wrapper">
        <Message>{statusMessage}</Message>
        <Hand
          handType={HandType.Dealer}
          count={dealerCount}
          cards={dealerCards}
        />
        <Hand
          handType={HandType.Player}
          count={playerCount}
          cards={playerCards}
        />

        <Actions hit={hit} stand={stand} reset={reset} gameState={gameState} />
      </main>
    </div>
  );
};

export default Table;

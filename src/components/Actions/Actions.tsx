import React from "react";
import "./Actions.css";
import { GameState } from "../../types";

interface ActionsProps {
  gameState: GameState;
  hit: Function;
  stand: Function;
  reset: Function;
}

const Actions = ({ gameState, hit, stand, reset }: ActionsProps) => {
  return (
    <div className="actions-container">
      <button
        className="actions-button"
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
        className="actions-button"
        disabled={
          (gameState === GameState.GameOver ||
            gameState === GameState.DealerHand) &&
          true
        }
        onClick={() => stand()}
      >
        Stand
      </button>

      <button
        className="actions-button action-button-full-width"
        onClick={() => reset()}
      >
        Reset
      </button>
    </div>
  );
};

export default Actions;

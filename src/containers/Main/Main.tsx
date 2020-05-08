import React, { useEffect, useCallback, useReducer } from "react";

import { CardType, GameState, StatusMessage } from "../../types";
import Table from "../../components/Table/Table";
import {
  boardReducer,
  INITIAL_BOARD_STATE,
} from "../../reducers/board-reducer";

const Main = () => {
  const [state, dispatch] = useReducer(boardReducer, INITIAL_BOARD_STATE);

  const drawCard = useCallback(
    (cardType: CardType) =>
      dispatch({
        type: "DRAW_CARD",
        payload: {
          cardType,
        },
      }),
    []
  );

  const hit = () => {
    drawCard(CardType.Player);
  };

  const stand = () => {
    dispatch({
      type: "UPDATE_GAME_STATE",
      payload: {
        gameState: GameState.DealerHand,
      },
    });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // Game Loop
  useEffect(() => {
    if (state.gameState === GameState.Init) {
      dispatch({ type: "DRAW_CARD", payload: { cardType: CardType.Player } });
      dispatch({ type: "DRAW_CARD", payload: { cardType: CardType.Hidden } });
      dispatch({ type: "DRAW_CARD", payload: { cardType: CardType.Player } });
      dispatch({ type: "DRAW_CARD", payload: { cardType: CardType.Dealer } });
      dispatch({
        type: "UPDATE_GAME_STATE",
        payload: {
          gameState: GameState.PlayerHand,
        },
      });
    }
    if (state.gameState === GameState.PlayerHand && state.playerCount > 21) {
      dispatch({ type: "DETERMINE_WINNER" });
    }

    if (state.gameState === GameState.DealerHand) {
      if (state.dealerScore >= 17) {
        dispatch({ type: "DETERMINE_WINNER" });
      } else {
        dispatch({ type: "DRAW_CARD", payload: { cardType: CardType.Dealer } });
      }
    }
  }, [state.gameState, state.playerCount, state.dealerScore]);

  return (
    <Table
      statusMessage={state.statusMessage}
      playerCount={state.playerCount}
      playerCards={state.playerCards}
      dealerCards={state.dealerCards}
      dealerCount={state.dealerCount}
      gameState={state.gameState}
      hit={hit}
      stand={stand}
      reset={reset}
    />
  );
};

export default Main;

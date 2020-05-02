import React, { useState, useEffect, useCallback } from "react";
import { deck as defaultDeck } from "../../constants/deck";
import {
  CardType,
  GameState,
  StatusMessage,
  PickedCard,
  Card,
} from "../../types";
import { getCardCount } from "../utils";
import Table from "../../components/Table/Table";

const Main = () => {
  const [deck, setDeck] = useState<Card[]>(defaultDeck);

  // Player Cards
  const [playerCards, setPlayerCards] = useState<PickedCard[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(0);

  // Dealer Cards
  const [dealerCards, setDealerCards] = useState<PickedCard[]>([]);
  const [dealerCount, setDealerCount] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);

  //Status Message
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.Init);

  const drawCard = useCallback(
    (cardType: CardType) => {
      if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomIndex];

        let modifiedDeck = deck;
        modifiedDeck.splice(randomIndex, 1);

        setDeck([...modifiedDeck]);
        setCard(cardType, card);
      } else {
        setStatusMessage(StatusMessage.GameOver);
      }
    },
    [deck]
  );

  const setCard = (cardType: CardType, card: Card) => {
    switch (cardType) {
      case CardType.Player:
        const playerCard = [{ ...card, hidden: false }];
        setPlayerCount((prevState) => getCardCount(prevState, card));
        setPlayerCards((prevState) => [...prevState, ...playerCard]);
        break;

      case CardType.Dealer:
        const dealerCard = [{ ...card, hidden: false }];
        setDealerCount((prevState) => getCardCount(prevState, card));
        setDealerScore((prevState) => getCardCount(prevState, card));
        setDealerCards((prevState) => [...prevState, ...dealerCard]);
        break;

      case CardType.Hidden:
        const hiddenCard = [{ ...card, hidden: true }];
        setDealerScore((prevState) => getCardCount(prevState, card));
        setDealerCards((prevState) => [...prevState, ...hiddenCard]);
        break;

      default:
        break;
    }
  };

  const hit = () => {
    drawCard(CardType.Player);
  };

  const stand = () => {
    setGameState(GameState.DealerHand);
  };

  const revealDealerCards = useCallback(() => {
    const revealedDealerCards: PickedCard[] = dealerCards.map(
      (card: PickedCard) => {
        if (card.hidden === true) {
          card.hidden = false;
        }
        return card;
      }
    );
    setDealerCount(dealerScore);
    setDealerCards(revealedDealerCards);
  }, [dealerCards, dealerScore]);

  const determineWinner = (playerScore: number, dealerScore: number) => {
    if (playerScore > dealerScore || dealerScore > 21) {
      setStatusMessage(StatusMessage.PlayerWins);
    } else if (dealerScore > playerScore) {
      setStatusMessage(StatusMessage.DealerWins);
    } else {
      setStatusMessage(StatusMessage.Tie);
    }
  };

  const reset = () => {
    setPlayerCount(0);
    setDealerCount(0);
    setDealerScore(0);
    setPlayerCards([]);
    setDealerCards([]);
    setGameState(GameState.Init);
    setStatusMessage("");
  };

  // Game Loop
  useEffect(() => {
    if (gameState === GameState.Init) {
      drawCard(CardType.Player);
      drawCard(CardType.Hidden);
      drawCard(CardType.Player);
      drawCard(CardType.Dealer);
      setGameState(GameState.PlayerHand);
    }
    if (gameState === GameState.PlayerHand && playerCount > 21) {
      setGameState(GameState.GameOver);
      setStatusMessage(StatusMessage.DealerWins);
    }

    if (gameState === GameState.DealerHand) {
      if (dealerScore >= 17) {
        revealDealerCards();
        determineWinner(playerCount, dealerScore);
      } else {
        drawCard(CardType.Dealer);
      }
    }
  }, [
    gameState,
    playerCount,
    dealerCount,
    dealerScore,
    dealerCards,
    drawCard,
    revealDealerCards,
  ]);

  return (
    <div>
      <h1>Black Jack</h1>
      <Table
        statusMessage={statusMessage}
        deck={deck}
        playerCount={playerCount}
        playerCards={playerCards}
        dealerCards={dealerCards}
        dealerCount={dealerCount}
        gameState={gameState}
        hit={hit}
        stand={stand}
        reset={reset}
      />
    </div>
  );
};

export default Main;

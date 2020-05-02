import React, { useState, useEffect } from "react";
import { deck as defaultDeck, Card } from "../../constants/deck";

const Main = () => {
  const [deck, setDeck] = useState<Card[]>(defaultDeck);

  enum CardType {
    Player,
    Dealer,
    Hidden,
  }

  interface PickedCard extends Card {
    hidden: boolean;
  }

  enum StatusMessage {
    PlayerWins = "You Win, Dealer Lose",
    DealerWins = "Dealer Wins, You Lose",
    Tie = "The game resulted in a Tie!",
  }

  enum GameState {
    Init,
    PlayerHand,
    DealerHand,
    GameOver,
  }

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

  // Game state
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
        checkWin();
      } else {
        drawCard(CardType.Dealer);
      }
    }
  }, [gameState, playerCount, dealerCount]);

  const getAceValue = (count: number) => {
    if (count + 11 > 21) {
      return 1;
    } else {
      return 11;
    }
  };

  const getCount = (count: number = 0, card: Card): number => {
    switch (card.value) {
      case "A":
        count = getAceValue(count);
        break;
      case "K":
        count += 10;
        break;
      case "Q":
        count += 10;
        break;
      case "J":
        count += 10;
        break;
      default:
        count += Number(card.value);
        break;
    }
    return count;
  };

  const drawCard = (cardType: CardType) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];

      let modifiedDeck = deck;
      modifiedDeck.splice(randomIndex, 1);

      setDeck([...modifiedDeck]);
      setCard(cardType, card);
    } else {
      alert("All cards have been drawn");
    }
  };

  const setCard = (cardType: CardType, card: Card) => {
    switch (cardType) {
      case CardType.Player:
        const playerCard = [{ ...card, hidden: false }];
        setPlayerCount((prevState) => getCount(prevState, card));
        setPlayerCards((prevState) => [...prevState, ...playerCard]);
        break;

      case CardType.Dealer:
        const dealerCard = [{ ...card, hidden: false }];
        setDealerCount((prevState) => getCount(prevState, card));
        setDealerScore((prevState) => getCount(prevState, card));
        setDealerCards((prevState) => [...prevState, ...dealerCard]);
        break;

      case CardType.Hidden:
        const hiddenCard = [{ ...card, hidden: true }];
        setDealerScore((prevState) => getCount(prevState, card));
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

  const revealDealerCards = () => {
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
  };

  const checkWin = () => {
    revealDealerCards();
    if (playerCount > dealerScore || dealerScore > 21) {
      setStatusMessage(StatusMessage.PlayerWins);
    } else if (dealerScore > playerCount) {
      setStatusMessage(StatusMessage.DealerWins);
    } else {
      setStatusMessage(StatusMessage.Tie);
    }
  };

  const reset = () => {
    setStatusMessage("");
    setPlayerCount(0);
    setDealerCount(0);
    setDealerScore(0);
    setPlayerCards([]);
    setDealerCards([]);
    setGameState(GameState.Init);
  };

  return (
    <div>
      <h1>Black Jack</h1>
      <h4>{statusMessage}</h4>
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

export default Main;
